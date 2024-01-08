npm install react-icons
npm install -g @mobiscroll/cli
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
mobiscroll config react 

j'ai le composant 
je veux passer en parametre 
le titre (element)
le data de la table 
les routers pour ajouter , modifier , supprimer
je veux generaliser la table par exemple j'ai le date
{
    { "id" : 1 , "nom" : "huhu" , "date" : "lala" , "chien" : "toto" },
    { "id" : 2 , "nom" : "haha" , "date" : "soso" , "chien" : "toto" },
    { "id" : 3 , "nom" : "tutu" , "date" : "fifi" , "chien" : "toto" },
    { "id" : 4 , "nom" : "fufu" , "date" : "zaz" , "chien" : "toto" },
}
je vais preciser quelles sont les colonnes de la table generaliser
ici je veux affichier nom , date et chien
ma table devra donc contenir ces colonnes 
