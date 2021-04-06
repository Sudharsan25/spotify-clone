export const initialState = {
  user: null,
  playlist: [],
  playing: false,
  token:
    "BQDHx7qKNuIALLznbZ89LGYQ4GK41LZeKVjq990KDLRp8T5lx5T51osLBepdur5By_9Kye7pkbilcgvj9wwtxfezzD_p_dePHYMjF9KYsgeAXeeo0sboBVFbiu_7-_lErwDFLfF9SsFW_1zr_nZiopcdDivC355PcwnIZ_XvSX8baby_zKdy",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
};

export default reducer;
