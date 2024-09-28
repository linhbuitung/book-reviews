import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 8080;
const API_URL = "http://localhost:3000/";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});

app.get("/", async (req, res) => {
	let category = req.query.category;
	let order = req.query.order;
	try {
		if (!category) {
			category = "read_date";
		}
		if (!order) {
			order = "desc";
		}   
		const bookList = await axios.get(API_URL + "books", {
			params: {
				category: category,
				order: order,
			},
		});
		res.render("index.ejs", {
			bookList: bookList.data,
		});
	} catch (error) {
		res.send(error);
	}
});

app.get("/book/:id",  async (req,res) => {
	const id = req.params.id;
	try {
		
		const book = await axios.get(API_URL + "book/" + id);
		const notes = await axios.get(API_URL + "book/" + id + "/notes");
		res.render("book.ejs", {
			book: book.data,
			notes: notes.data
		});
	} catch (error) {
		res.send(error);
	}
})

app.post("/book/:id/note", async(req,res) =>{
	const id = req.params.id;
	const content = req.body.newNoteContent;
	
	try {
		if (content && content.length != 0) {
			const response = await axios.post(API_URL + `book/${id}/note`, {
				content: content,
			});
		}
		
		res.redirect(`/book/${id}`);
	} catch (error) {
		res.send(error);
	}
	
});

app.get("/note/:idNote/delete", async(req,res)=>{
	const noteId = req.params.idNote;
	
	try {
		const note = await axios.get(API_URL + `note/${noteId}`);
		const response = await axios.delete(API_URL + `note/${noteId}`);
		res.redirect(`/book/${note.data.book_id}`);
	} catch (error) {
		res.send(error);
	}
});

app.get("/book/:id/delete", async (req, res) => {
	const bookId = req.params.id;

	try {
		const response = await axios.delete(API_URL + `book/${bookId}`);
		res.redirect("/");
	} catch (error) {
		res.send(error);
	}
});

app.get("/new/book", async (req, res) => {
	try {
		
		//const response = await axios.post(API_URL+"book",)
		res.render("book-modify.ejs");
	} catch (error) {
		res.send(error);
	}
});

app.get("/book/:id/edit", async (req, res) => {
	try {
		const id = req.params.id;
		const response = await axios.get(API_URL + `book/${id}`);
		console.log(response.data);
		res.render("book-modify.ejs", { book: response.data });
	} catch (error) {
		res.send(error);
	}
});

app.post("/add-book", async (req, res) => {
	try {
	
		const data = req.body;
		const response = await axios.post(API_URL+"book", data );
		res.redirect("/");
	} catch (error) {
		res.send(error);
	}
});

app.post("/modify-book/:id", async (req, res) => {
	try {
		const bookId = req.params.id;
		const data = req.body;
		const response = await axios.put(API_URL + `book/${bookId}`, data);
		res.redirect(`/book/${bookId}`);
	} catch (error) {
		res.send(error);
	}
});


app.get("/note/:id/edit", async (req, res) => {
	try {
		const id = req.params.id;
		const response = await axios.get(API_URL + `note/${id}`);
		console.log(response.data);
		res.render("note-modify.ejs", { note: response.data });
	} catch (error) {
		res.send(error);
	}
});

app.post("/modify-note/:id", async (req, res) => {
	try {
		const noteId = req.params.id;
		
		const data = req.body;
		const response = await axios.put(API_URL + `note/${noteId}`, data);
		res.redirect(`/book/${data.book_id}`);
	} catch (error) {
		res.send(error);
	}
});

app.get("/about", async(req,res)=>{
	res.render("about.ejs");
})