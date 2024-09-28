drop table if exists books CASCADE ;
drop table if exists notes CASCADE ;
create table books (
id serial primary key,
isbn varchar(30),
name varchar(300) not null,
author varchar(200),
read_date Date,
rating int ,
review varchar(1000),
amazon_link varchar(500)
);

create table notes (
id serial primary key,
content varchar(2000) not null,
book_id int references books(id)
);




INSERT INTO books(
	 isbn, name, author, read_date, rating, review, amazon_link)
	VALUES ( '0525478817', 'The Fault in Our Stars', 'John Green', 
	'2024-04-01', 10,'etur adipiscing elit. Integer at tincidunt nunc. Pellentesq', 'https://www.amazon.com/Fault-Our-Stars-John-Green/dp/014242417X'),
	( '0007488319', 'The Fellowship of the Ring', 'J.R.R. Tolkien', 
	'2024-05-25', 9, 'gula dui, pharetra eget pretium in, gravida eu augue. Sed porttitor ', 'https://www.amazon.com/Fellowship-Ring-Being-First-Rings/dp/0547928211');

INSERT INTO notes( book_id, content) VALUES 
(1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at tincidunt nunc. Pellentesque a placerat nisl. Nulla pellentesque orci eget dignissim efficitur. Integer sit amet augue eget orci mattis sollicitudin ac eu metus. In odio lorem, mattis id commodo ut, viverra nec nunc. Mauris auctor accumsan elit, in vehicula ante.'),
(1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor mi quis velit gravida, sit amet congue justo maximus. Quisque ullamcorper nibh non libero posuere laoreet. Mauris nec lectus vitae quam efficitur consectetur eget non ligula. Aenean quis erat hendrerit, scelerisque ligula eu, blandit tellus. Quisque fringilla, lectus a molestie.'),
(2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis leo vitae nibh sollicitudin, a porttitor augue sollicitudin. Cras ligula dui, pharetra eget pretium in, gravida eu augue. Sed porttitor justo nec ultricies interdum. Sed a massa dignissim nisl ultricies molestie. Cras scelerisque et lacus ac finibus. Praesent velit risus.');

select * from books join notes on books.id = book_id;


INSERT INTO books(
	 isbn, name, author, read_date, rating, review, amazon_link)
	VALUES ( '1461836158', 'The Two Towers', 'J.R.R. Tolkien', 
	'2024-04-12', 10,'Pellentesque et commodo urna. Duis id fermentum nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis tristique consequat metus vitae dictum. Ut nec erat sit amet lectus fermentum aliquam eget at nisi. Morbi ex diam, rutrum et ullamcorper in, dictum eget leo. Vestibulum eleifend.',
	'https://www.amazon.com/dp/0547928203');
