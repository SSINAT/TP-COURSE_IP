import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
// Updated import
import { Int } from '@nestjs/graphql';
import { Book } from './entities/book.entity';

@Resolver(() => Book) // Updated to Book
export class BookResolver {
  private books: Book[] = [
    {
      id: 1,
      title: 'Mathematics',
      author: 'Dara',
      price: 10,
    },
    {
      id: 2,
      title: 'Physics',
      author: 'Sok',
      price: 20,
    },
    {
      id: 3,
      title: 'Chemistry',
      author: 'Ratha',
      price: 15,
    },
  ];

  @Query((returns) => [Book])
  getAllBooks() {
    return this.books;
  }

  @Query((returns) => Book, { nullable: true })
  getBookById(@Args('id', { type: () => Int }) id: number) {
    return this.books.find((book) => book.id === id);
  }

  @Mutation((returns) => Book)
  addBook(
    @Args('title') title: string,
    @Args('price', { type: () => Int }) price: number,
  ) {
    const sortedBooks = this.books.sort((a, b) => a.id - b.id);
    const lastId =
      sortedBooks.length > 0 ? sortedBooks[sortedBooks.length - 1].id : 0;
    const newBook: Book = {
      id: lastId + 1,
      title,
      price,
      author: 'Unknown',
    };
    this.books.push(newBook);
    return newBook;
  }

  @Mutation((returns) => Book)
  updateBook(
    @Args('id', { type: () => Int }) id: number,
    @Args('title') title: string,
    @Args('price', { type: () => Int }) price: number,
  ) {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new Error('Book not found');
    }
    const updatedBook: Book = {
      ...this.books[bookIndex],
      title,
      price,
    };
    this.books[bookIndex] = updatedBook;
    return updatedBook;
  }

  @Mutation((returns) => Boolean)
  deleteBook(@Args('id', { type: () => Int }) id: number) {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      return false;
    }
    this.books.splice(bookIndex, 1);
    return true;
  }
}
