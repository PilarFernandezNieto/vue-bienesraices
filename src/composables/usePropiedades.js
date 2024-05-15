import { computed } from "vue";
import { collection } from "firebase/firestore";
import { useFirestore, useCollection } from "vuefire";

export default function usePropiedades(){

    const db = useFirestore();
    const propiedadesCollection = useCollection(collection(db, "propiedades"))

    const priceProperty = computed(() => {
        console.log('Precio');
        
    })

    
    
    
    
    return {
        priceProperty,
        propiedadesCollection
    }
}