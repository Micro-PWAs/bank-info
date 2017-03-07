const API_URL = '/api';

export async function getBankList(){
  let response =  await fetch(`${API_URL}/listbanks`);
  return response.json();
}

export async function getBranchList(bank){
  let response =  await fetch(`${API_URL}/listbranches/${bank}`);
  return response.json();
}

export async function getFullDetails(bank, branch){
  let response =  await fetch(`${API_URL}/getbank/${bank}/${branch}`);
  return response.json();
}



