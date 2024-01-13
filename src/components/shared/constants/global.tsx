const Url_api = "https://nba-1840-1892-1906.el.r.appspot.com/";
// const Url_api = "http://localhost:8080";
const errorMessage = [
  {
    code: "ERR_NETWORK",
    message:
      "Connexion au serveur impossible. Veuillez vérifier votre connexion internet.",
  },
  {
    code: "ERR_BAD_REQUEST",
    message: "Ressource introuvable.",
  },
];
export { Url_api, errorMessage };
