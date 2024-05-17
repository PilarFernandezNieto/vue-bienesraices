import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth';
import { useFirebaseAuth } from 'vuefire';
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/propiedad/:id",
      name: "propiedad",
      component: () => import("../views/PropiedadView.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/admin/AdminLayout.vue"),
      meta: {requiresAuth: true},
      children: [
        {
          path: "propiedades", // /admin/propiedades
          name: "admin-propiedades",
          component: () => import("../views/admin/AdminView.vue"),
        },
        {
          path: "nueva", // /admin/nueva
          name: "nueva-propiedad",
          component: () => import("../views/admin/NuevaPropiedadView.vue"),
        },
        {
          path: "editar/:id", // /admin/editar/:id
          name: "editar-propiedad",
          component: () => import("../views/admin/EditarPropiedadView.vue"),
        },
      ],
    },
  ],
});

// Guard de navegación
router.beforeEach(async(to, from, next) => {
  const requiresAuth = to.matched.some((url) => url.meta.requiresAuth)
  if(requiresAuth){
    // Comprobar que el usuario está autenticado
    try {
      await authenticateUser();
      next()
    } catch(error){
      console.log(error);
      next({name: "login"})
    }


  } else {
    // No está protegido, mostramos la vista
    next();
  }
  
})

function authenticateUser(){
  const auth = useFirebaseAuth();
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {

      unsubscribe() // Deja de escuchar los cambios de la función 
      if(user){
        resolve()
      } else {
        reject()
      }
    })

  })
}

export default router
