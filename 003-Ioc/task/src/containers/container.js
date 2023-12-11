import "reflect-metadata";
import { Container } from "inversify"
import BooksRepository from "../classes/BooksRepository";

const mainContainer = new Container();
mainContainer.bind(BooksRepository).toSelf();

export default mainContainer;
