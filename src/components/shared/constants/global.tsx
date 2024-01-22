// const Url_api = "https://cloud-s5-back-stage.up.railway.app";
const Url_api = "http://localhost:8080";

const firebase_img =
  "https://firebasestorage.googleapis.com/v0/b/crypto-hallway-387021.appspot.com/o/logo%2F260c808a-78b0-4c8c-a9b2-f8f641bce608?alt=media&token=d13dfa35-ee78-4c4b-bae5-d25e5ba3a767";
const imagkit = "https://ik.imagekit.io/vfyu3fmed/";

const errorMessage = [
  {
    code: "ERR_NETWORK",
    message:
      "Connexion au serveur impossible. Veuillez vérifier votre connexion internet.",
  },
  {
    code: "ERR_BAD_REQUEST",
    message: "Requête mal formée.",
  },
];

export { Url_api, errorMessage, firebase_img, imagkit };
