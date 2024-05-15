import { ref } from 'vue';


export default function useLocationMap(){

    const zoom = ref(15)
    const center = ref([43.5314833, -5.709654])

    function pin(e){
        const marker = e.target.getLatLng();

    }

    return {
        zoom,
        center,
        pin

    }
}