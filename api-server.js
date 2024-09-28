import express from "express";
import bodyParser from "body-parser";

import pg from "pg";
import env from "dotenv";

const app = express();
const port = 3000;
const COVER_API_URL_1 = "https://covers.openlibrary.org/b/isbn/";
const COVER_API_URL_2 ="-M.jpg";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	database: process.env.PG_DATABASE,
	password: process.env.PG_PASSWORD,
	port: process.env.PG_PORT,
});

db.connect();

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});

//get
app.get("/books", async (req, res) => {
	const sortCategory = req.query.category;
	const sortOrder = req.query.order;
   
	try {
		let data;
		if (!sortCategory) {
			data = await getBooks();
		} else {
			
			data = await getBooks(sortCategory, sortOrder);
		}
        data.forEach((item) => {
					item.url = COVER_API_URL_1 + item.isbn + COVER_API_URL_2;
                    
				});
		res.json(data);
	} catch (error) {
		console.log(error);
		res.status(500).send("error: query error");
	}
});

app.get("/book/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const exist = await checkBookExist(id);
		if (!exist) {
			res.status(404).send("error: book does not exist");
			return;
		}
		const data = await db.query("select * from books where id = $1", [id]);
        let returnData = data.rows[0];
        returnData.url = COVER_API_URL_1 + returnData.isbn + COVER_API_URL_2;
		res.json(returnData);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
});

async function getBooks(sortCategory, sortOrder) {
	if (!sortCategory && !sortOrder) {
		let result = await db.query("SELECT * FROM books");
		return result.rows;
	}
	const validSortOrder = ["ASC", "DESC"];
	if (!validSortOrder.includes(sortOrder.toUpperCase())) {
		throw new Error("Invalid sort direction");
	}
	const query = `SELECT * FROM books ORDER BY ${sortCategory} ${sortOrder}`;
	let result = await db.query(query);
	return result.rows;
}

app.get("/book/:id/notes", async (req, res) => {
	const id = req.params.id;
	try {
		const exist = await checkBookExist(id);
		if (!exist) {
			res.status(404).send("error: book does not exist");
			return;
		}
		const data = await db.query("select * from notes where book_id = $1", [id]);
		res.json(data.rows);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
});

app.get("/notes", async (req, res) => {
	try {
		const data = await db.query("select * from notes");
		res.json(data.rows);
	} catch (error) {
		console.log(error);
		res.status(500).send("error: query error");
	}
});

app.get("/note/:id", async (req, res) => {
	const noteId = req.params.id;
	try {
		const data = await db.query(`select * from notes where id = ${noteId}`);
		res.json(data.rows[0]);
	} catch (error) {
		console.log(error);
		res.status(500).send("error: query error");
	}
});
//post
app.post("/book", async (req, res) => {
	try {
		const isbnExists = await checkIsbnExist(req.body.isbn);
		if (isbnExists) {
			res.status(409).send("error: book with this isbn already existed");
			return;
		}
		if (req.body.rating > 10 || req.body.rating < 0) {
			res.status(500).send("error: illegal rating");
			return;
		}
		const addedBook = await db.query(
			"INSERT INTO books( isbn, name, author, read_date, rating, review, amazon_link) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *",
			[
				req.body.isbn,
				req.body.name,
				req.body.author,
				req.body.read_date,
				req.body.rating,
				req.body.review,
				req.body.amazon_link,
			]
		);
		res.json(addedBook.rows[0]);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
});

app.post("/book/:id/note", async (req, res) => {
	const book_id = req.params.id;
	try {
		const bookExist = await checkBookExist(book_id);
		if (!bookExist) {
			res.status(404).send("error: book does not exist");
			return;
		}
		const addedNote = await db.query(
			"insert into notes(book_id, content) values ($1, $2)",
			[book_id, req.body.content]
		);
		res.json(addedNote.rows[0]);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
});

async function checkIsbnExist(isbn) {
	const data = await db.query("select * from books where isbn = $1", [isbn]);
	if (data.rowCount == 0) {
		return false;
	}
	return true;
}

async function checkBookExist(id) {
	const data = await db.query("select * from books where id = $1", [id]);
	if (data.rowCount == 0) {
		return false;
	}
	return true;
}

async function checkNoteExist(id) {
	const data = await db.query("select * from notes where id = $1", [id]);
	if (data.rowCount == 0) {
		return false;
	}
	return true;
}

//put
app.put("/book/:id", async (req, res) => {
	const id = req.params.id;
	if(req.body.rating){
		if (req.body.rating > 10 || req.body.rating < 0) {
			res.status(500).send("error: illegal rating");
			return;
		}
	}
	try {
		const exist = await checkBookExist(id);
		if (!exist) {
			res.status(404).send("error: book does not exist");
			return;
		}
		let book = (
			await db.query("select * from books where id = $1 limit 1", [id])
		).rows[0];
		let b = {
			isbn: req.body.isbn || book.isbn,
			name: req.body.name || book.name,
			author: req.body.author || book.author,
			read_date: req.body.read_date || book.read_date,
			rating: req.body.rating || book.rating,
			review: req.body.review || book.review,
			amazon_link: req.body.amazon_link || book.amazon_link,
		};
		const result = await db.query(
			"UPDATE books SET isbn=$1, name=$2, author=$3, read_date=$4, rating=$5, review=$6, amazon_link=$7 WHERE id = $8 returning *",
			[
				b.isbn,
				b.name,
				b.author,
				b.read_date,
				b.rating,
				b.review,
				b.amazon_link,
				id,
			]
		);
		res.json(result.rows[0]);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
});

app.put("/note/:id", async (req, res) => {
	const id = req.params.id;

	try {
		const exist = await checkNoteExist(id);
		if (!exist) {
			res.status(404).send("error: note does not exist");
			return;
		}
		let note = (
			await db.query("select * from notes where id = $1 limit 1", [id])
		).rows[0];
		let n = {
			content: req.body.content || note.content,
			book_id: req.body.book_id || note.book_id,
		};
		const result = await db.query(
			"UPDATE public.notes SET  content=$1, book_id=$2 WHERE id = $3 returning *",
			[n.content, n.book_id, id]
		);
		res.json(result.rows[0]);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
});

//delete
app.delete("/book/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const bookExist = await checkBookExist(id);
		if (!bookExist) {
			res.status(404).send("error: book does not exist");
			return;
		}
		await db.query("delete from books where id = $1", [id]);
        res.status(200).send(`book deleted with id ${id}`);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
});

app.delete("/note/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const exist = await checkNoteExist(id);
		if (!exist) {
			res.status(404).send("error: note does not exist");
			return;
		}
		await db.query("delete from notes where id = $1", [id]);
		res.status(200).send(`note deleted with id ${id}`);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
});
