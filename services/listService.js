import { sql } from "../database/database.js";

const create = async (name) => {
  await sql`INSERT INTO shopping_lists (name) VALUES (${ name })`;
};

const listShoppingLists = async () => {
  return await sql`SELECT * FROM shopping_lists WHERE active = true`;
};



  const findItems = async (Id) => {
    const ID = Number(Id);
    const rows = await sql`SELECT * FROM shopping_list_items
      WHERE shopping_list_id = ${ ID } AND collected = false ORDER BY name ASC`;
      return rows
    
  };

  const getListName = async (Id) => {
    const ID = Number(Id);
    const rows = await sql`SELECT name FROM shopping_lists WHERE id = ${ ID };`;
      return rows[0].name

  };
  /*
    if (rows && rows.length > 0) {
      return rows;
    } else{
      return []
      //Här verkar det gå fel. Funktionen returnar nog säkert bara [].
    }
    
  };*/

  

  const findCollectedItems = async (Id) => {
    const ID = Number(Id);
    const rows = await sql`SELECT * FROM shopping_list_items
      WHERE shopping_list_id = ${ ID } AND collected = true ORDER BY name ASC`;
      return rows
  }; 
  

  const createListEntry = async (id, name) => {
    await sql`INSERT INTO
      shopping_list_items (shopping_list_id, name)
      VALUES (${ id }, ${ name })`;
  };


  const collect = async (id) => {
    await sql`UPDATE shopping_list_items
      SET collected = true WHERE id = ${ id }`;
  };

  const deactivateList = async (id) => {
    await sql`UPDATE shopping_lists
      SET active = false WHERE id = ${ id }`;
  };

  const count = async () => {
     const amount = await sql`SELECT COUNT(id) FROM shopping_lists `;
     const result = amount[0].count
     return result
  
  };
  const countItems = async () => {
    const number = await sql`SELECT COUNT(id) FROM shopping_list_items `;
    const result_2 = number[0].count;
    return result_2;
 
 };

export { create, listShoppingLists, createListEntry, findItems, collect, findCollectedItems, deactivateList, count, countItems, getListName };
