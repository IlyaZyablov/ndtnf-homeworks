import express from 'express';
import { config } from 'dotenv';
import session from 'express-session';
import mainContainer from "./containers/container";
import BooksRepository from "./classes/BooksRepository";

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(session({ secret: 'SECRET' }));

app.get(':id', async (req, res) => {
  const repo = mainContainer.get(BooksRepository);
  const book = await repo.getBook(req.params.id);
  res.json(book);
})

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});