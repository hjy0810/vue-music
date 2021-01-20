const routes = [
  {
    path:'/',
    name:'Home',
    component:() =>  import('../components/Home'),
    redirect:'/login',
    children:[
      {
        path:'/main',
        name:'Main',
        component:() =>  import('../views/Main'),
      },
      {
        path:'/video',
        name:'Video',
        component:() =>  import('../views/Video'),
      },
      {
        path:'/allmv',
        name:'AllMV',
        component:() =>  import('../views/AllMV'),
      },
      {
        path:'/playlist/:id',
        name:'Playlist',
        component:() => import('../views/Playlist')
      },
      {
        path:'/singer',
        name:'Singer',
        component:() => import('../views/Singer')
      },
      {
        path:'/rank',
        name:'Rank',
        component:() => import('../views/Rank')
      },
      {
        path:'/search/:keywords',
        name:'Search',
        component:() => import('../views/Search')
      },
      {
        path:'/singer_detail/:sid',
        name:'SingerDetail',
        component:() => import('../views/SingerDetail')
      },
    ]
  },
  {
    path:'/playmv/:mvID',
    name:'PlayMV',
    component:() => import('../views/PlayMV')
  },
  {
    path:'/login',
    name:'Login',
    component:() =>  import('../views/Login'),
  },
]

export default routes;