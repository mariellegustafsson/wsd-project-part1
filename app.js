
import { serve } from "./deps.js";
import { configure } from "./deps.js";
import * as listController from "./controllers/listController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);
  console.log("URL: ", url)


  if (url.pathname === "/" && request.method === "GET") {
    return await listController.countLists(request)

  } else if (url.pathname === "/lists" && request.method === "GET") {
    return await listController.viewLists(request)

  } else if (url.pathname === "/lists" && request.method === "POST") {
    return await listController.addList(request);


} else if (url.pathname.match("lists/[0-9]+") && request.method === "GET") {
  return await listController.viewSpecificList(request);

}else if (url.pathname.match("lists/[0-9]+/items/[0-9]+/collect") && request.method === "POST"){
  return await listController.collectItem(request);

}else if (url.pathname.match("lists/[0-9]+/deactivate")  && request.method === "POST"){
  return await listController.removeList(request)

} else if (url.pathname.match("lists/[0-9]+/items") && request.method === "POST") {
  return await listController.addItemtoList(request);

}else{
    return new Response("Not found", { status: 404 });
  }
  
 
};

serve(handleRequest, { port: 7777 });