import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useFirebaseAuth } from "vuefire";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useAuthStore = defineStore("auth", () => {
  const auth = useFirebaseAuth();
  const errorMessage = ref("");
  const authUser = ref({});

  const errorCodes = {
    "auth/user-not-found": "Usuario no encontrado",
    "auth/wrong-password": "El password es incorrecto",
    "auth/invalid-credential": "Error de autenticación",
  };

  const login = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        authUser.value = user;
      })
      .catch((error) => {
        errorMessage.value = errorCodes[error.code];
      });
  };
  const hasError = computed(() => {
    return errorMessage.value;
  });

  return {
    login,
    hasError,
    errorMessage,
  };
});
