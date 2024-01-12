// FileUrlFetcher.js
import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { imageDb } from "../firebase/config";

function FileUrlFetcher(fichier_nom) {
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    const fetchFileUrl = async () => {
      const fileRef = ref(imageDb, `logo/${fichier_nom}`);

      try {
        const url = await getDownloadURL(fileRef);
        setFileUrl(url);
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération de l'URL du fichier:", error);
      }
    };

    if (fichier_nom) {
      fetchFileUrl();
    }

  }, [fichier_nom]);

  // Retourne directement l'URL du fichier
  return fileUrl || "";
}

export default FileUrlFetcher;
