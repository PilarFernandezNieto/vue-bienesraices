import { ref, computed, onMounted } from "vue";
import { defineStore } from "pinia";
import { useFirebaseAuth } from "vuefire";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const auth = useFirebaseAuth();
  const errorMessage = ref("");
  const authUser = ref(null);
  const router = useRouter();
  
  const errorCodes = {
    "auth/user-not-found": "Usuario no encontrado",
    "auth/wrong-password": "El password es incorrecto",
    "auth/invalid-credential": "Error de autenticación",
  };

  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
       authUser.value = user
      }
      
    })
  })

  const login = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        authUser.value = user;
        router.push({name: "admin-propiedades"})
       
      })
      .catch((error) => {
        errorMessage.value = errorCodes[error.code];
      });
  };

  const logout = (() => {
    signOut(auth)
      .then(() => {
        authUser.value = null
        router.push({name: "login"})

      })
      .catch((error) => {
        console.log(error);
      })
  })
  const hasError = computed(() => {
    return errorMessage.value;
  });

  const isAuth = computed(()=>{
    return authUser.value
  })

  return {
    login,
    logout,
    hasError,
    errorMessage,
    isAuth
  };
});
