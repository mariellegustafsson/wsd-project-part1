import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
//import { renderFile } from "../deps.js"

import * as listService from "../services/listService.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};

const addList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await listService.create(name);

  return redirectTo("/lists");
};

const viewLists = async (request) => {
  const data = {
    lists: await listService.listShoppingLists(),
  };

  return new Response(await renderFile("lists.eta", data), responseDetails);
};

const viewSpecificList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
  
    const data = {
      items: await listService.findItems(urlParts[2]),
      collectedItems: await listService.findCollectedItems(urlParts[2]),
      shoppingListId: urlParts[2],
      name: await listService.getListName(urlParts[2]),
    };
    console.log(data.name);

  
  
    return new Response(await renderFile("items.eta", data), responseDetails);
  };

  const addItemtoList = async (request) => {
    
    const formData = await request.formData();
    const name = formData.get("name");
 
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    //console.log( "name, urlparts2: ",name, urlParts[2])
    await listService.createListEntry(urlParts[2], name);
   // console.log( "name, urlparts2: ",name, urlParts[2])
  
    

    return redirectTo(`/lists/${urlParts[2]}`);
  };

  const collectItem = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await listService.collect(urlParts[4]);

    
    return redirectTo(`/lists/${urlParts[2]}`);
    // return redirectTo(`/lists/${urlParts[2]}`);
  };


  const removeList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await listService.deactivateList(urlParts[2]);
    return redirectTo(`/lists`)
  };

  const countLists = async (request) => {
    
    const data = {
    listAmount: await listService.count(),
    itemAmount: await listService.countItems(),

    }

   // console.log("data: ",data)
    return new Response(await renderFile("index.eta", data), responseDetails);
  };
  


export { addList, viewLists, viewSpecificList, addItemtoList, collectItem, removeList, countLists};

