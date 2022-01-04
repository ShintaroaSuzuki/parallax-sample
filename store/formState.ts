import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store'

type FormStateType = {
  name: string;
  mailAddress: string;
  inquiry: string;
}

const initialState: FormStateType = {
  name: '',
  mailAddress: '',
  inquiry: ''
}

export const formStateSlice = createSlice({
  name: 'formState',
  initialState,
  reducers: {
    changeName: (state, action) => {
      state.name = action.payload
    },
    changeMailAddress: (state, action) => {
      state.mailAddress = action.payload
    },
    changeInquiry: (state, action) => {
      state.inquiry = action.payload
    }
  }
})

export const { changeName, changeMailAddress, changeInquiry } = formStateSlice.actions

export const selectForm = (state: RootState) => 
  state.formStateReducer


export default formStateSlice.reducer
