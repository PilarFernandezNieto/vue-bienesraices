import {ref as storageRef } from 'firebase/storage';
import { useFirebaseStorage, useStorageFile } from 'vuefire';
import { uid } from 'uid';

export default function useImagen(){
    
    const storage = useFirebaseStorage();
    const storageRefPath = storageRef(storage, `/propiedades/${uid()}`)

    const {
        url,
        upload
    } = useStorageFile(storageRefPath)

    




    return {

    }
}