// --------------------------------------IMPORTS------------------------------------
// ---Dependencies
import express, { Request, Response } from 'express';
// ---Model Data
import {
  validateLoginData,
  ILoginData
} from '#DataModel/loginMock';
// ---Custom
import { responseService, joiValidateService } from '#Config/respondServices';
import { Callback } from '#Config/customTypes';
import { Animes,validateAddData } from '#DataModel/dataAnimes';


// -----------------------------------CONFIG-------------------------------
const router = express.Router();
let catalogoAnimes:Animes[]=[];

// -----------------------------------ROUTES-------------------------------
// ---- Create ---------
router.post('/logearse', (req: Request, res: Response) => {
  console.log(`request for: ${req.originalUrl}`);

  const validateBody = validateLoginData(req.body);
  if (joiValidateService(res, validateBody)) {
    responseService(res, (doLoginOnRedis as Callback), req.body);
  }
});
// --------------------------------- QUERYS AND METHODS --------------------------
async function doLoginOnRedis(data:ILoginData) {
  console.log('cosas locas en db y redis: ', data);
  // Crea un nuevo producto en la base de datos
  return {
    internalError: false,
    result: { status: 'success', data }
  };
}
router.post('/Add',(req: Request, res: Response) => {
  console.log(`request for: ${req.originalUrl}`);

  const validateBody = validateAddData(req.body);
  if (joiValidateService(res, validateBody)) {
    responseService(res, ( addAnime as Callback), req.body);
  }
});
async function addAnime( data:Animes ){
  //crea un producto en la base de datos 
  catalogoAnimes =[...catalogoAnimes, data ]
  return {
      internalError: false,
      result: { status: 'success', data:catalogoAnimes }
  };
}
router.get('/Get',(req: Request, res: Response) => {
  console.log(`request for: ${req.originalUrl}`);
  responseService(res, getAnime as Callback, req.body);
});
async function getAnime(){
  return {
      internalError:false,
      result:{status:'sucess', data:catalogoAnimes}
  }
}
//--- Put
router.put('/Put', (req: Request, res: Response) => {
    console.log(`request for: ${req.originalUrl}`);
    const validateBody = validateAddData(req.body)
    if(joiValidateService(res, validateBody)){
        responseService(res,editAnime as unknown as Callback, req.body)
    }
});
async function editAnime(newAnime:Animes){
  console.log(catalogoAnimes, "catalogo de animes");
  let contTemp:Animes[]= [];
    for(let i = 0 ; i < catalogoAnimes.length; i++){
        let up:Animes = catalogoAnimes[i];
        if(newAnime.id === catalogoAnimes[i].id){
          contTemp = [...contTemp,newAnime]  
        }else{
          contTemp = [...contTemp,up]  
        } 
    }
    catalogoAnimes = contTemp
  return {
      internalError:false,
      result:{status:'sucess', data:catalogoAnimes}
  }
}
  //--- Delete
  router.delete('/Delete',(req: Request, res: Response)=>{
    console.log(`request for: ${req.originalUrl}`);
    responseService(res, deleteAni as unknown as Callback, req.body)
})
async function deleteAni(deleteAni:Animes){
  console.log('cosas locas en db y redis: ',deleteAni);
  let anidel:Animes[]=[]; 
    for(let i = 0; i < catalogoAnimes.length; i++){
        let del = catalogoAnimes[i];
        if(deleteAni.id != catalogoAnimes[i].id){
            anidel = [...anidel,del];
        }
    }
    catalogoAnimes = anidel
  return{
      internalError:false,
      result:{status:'sucess', data:catalogoAnimes}
  }
}
export default router;
