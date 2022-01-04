import { useState } from 'react'
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux'
import { selectForm, changeName, changeMailAddress, changeInquiry } from '../../store/formState'

const Page = () => {
  const { name, mailAddress, inquiry } = useSelector(selectForm)
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <text>お問い合わせフォーム</text>
      </div>
      <div>
        <text>お名前</text>
        <input type="text" value={name} onChange={(e) => dispatch(changeName(e.target.value))}/>
      </div>
      <div>
        <text>メールアドレス</text>
        <input type="text" value={mailAddress} onChange={(e) => dispatch(changeMailAddress(e.target.value))}/>
      </div>
       <div>
        <text>お問い合わせ</text>
        <input type="text" value={inquiry} onChange={(e) => dispatch(changeInquiry(e.target.value))}/>
      </div>
      <Link href="/" passHref>
        <div>
          <text>送信する</text>
        </div>
      </Link>
    </div>
  )
}

export default Page
