export const API_BASE_URL = "http://localhost:5000/api";
export const API_LOGIN_URL = `${API_BASE_URL}/users/authenticate`;
export const API_REGISTER_URL = `${API_BASE_URL}/users/create`;
export const API_WORD_URL = `${API_BASE_URL}/users/userPrompt`;
export const API_INITIALIZE_URL = `${API_BASE_URL}/prompts/initialize`;
export const API_ADDWORD_URL = `${API_BASE_URL}/prompts/add`;

export const NROWS = 6;
export const NLETTERS = 5;
export const VALIDCHARACTERS = "abcdefghijklmnopqrstuvwxyząćęłńóśźż".split("");
