## MERN Stack implementation for [Memcards](../README.md)

Because I'm going to be constantly rebuilding the backend to learn to new tech, I design the [API controller](./src/main.controller.ts) to be loosely coupled, to easily swap-out services *(AWS, MySQL, Azure, ect..)*. With that, I just have to create a new class that implements the [DataService interface](./src/services/dataService.types.ts) and change 2-3 lines of code in the [app file](./src/app.ts) to use it.

---

Instantiating the MongoDB service class

```TypeScript
    /*
    app.ts
    */

    import APIController from './main.controller';
    import MongoService from './services/mongo/mongo.service';

    class App {
      public app: Application;

      public controller: Controller;

      constructor() {
        this.app = express();
        this.setConfig();
        MongoService.setConfig();
        this.controller = new APIController(this.app, new MongoService());
      }

    // ...... 
    }
```


The API Controller
```TypeScript
    /*
    main.controller.ts
    */

    export default class APIController {
      private app: Application;

    private dataService: DataService;

    constructor(_app: Application, _dataService: DataService) {
      this.app = _app;
      this.dataService = _dataService;
      this.routes();
    }

      public routes() {
        this.app.route('/api/login').post(this.dataService.login);
        this.app.route('/api/register').post(this.dataService.createUser);
        this.app.route('/api/decks').get(auth, this.dataService.getAllDecks);
        this.app.route('/api/deck').post(auth, this.dataService.createDeck);
        this.app.route('/api/deck/:deckId').delete(auth, this.dataService.deleteDeck);
        this.app.route('/api/card').post(auth, this.dataService.createCard);
        this.app.route('/api/card/:cardId').put(auth, this.dataService.editCard)
          .delete(auth, this.dataService.deleteCard);
        this.app.route('/api/getImages').get(auth, unsplash);
      }
    }
```


DataService interface

```TypeScript
    /*
    dataService.types.ts
    */

    export interface DataService {
      login(req: Request, res: Response): Promise<Response> | void;
      createUser(req: Request, res: Response): Promise<Response> | void;
      getAllDecks(req: Request, res: Response): Promise<Response> | void;
      createDeck(req: Request, res: Response): Promise<Response> | void;
      deleteDeck(req: Request, res: Response): Promise<Response> | void;
      createCard(req: Request, res: Response): Promise<Response> | void;
      editCard(req: Request, res: Response): Promise<Response> | void;
      deleteCard(req: Request, res: Response): Promise<Response> | void;
    }
```
