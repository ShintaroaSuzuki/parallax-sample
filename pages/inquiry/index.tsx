import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux'
import { selectForm, changeName, changeMailAddress, changeInquiry } from '../../store/formState'

const Page = () => {
  const { name, mailAddress, inquiry } = useSelector(selectForm)
  const dispatch = useDispatch();

  const submitForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!!name && !!mailAddress) {
      e.preventDefault()
      await fetch('/api/notion', {
        method: 'POST',
        body: JSON.stringify({ name, mailAddress, inquiry })
      })
      await fetch('api/discord', {
        method: 'POST',
        body: JSON.stringify({ name })
      })
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
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
      <div>
        <text>{(!!name && !!mailAddress) ? 'OK' : '必須項目が足りません'}</text>
      </div>
      <div>
        <button onClick={submitForm} style={{ padding: 10, backgroundColor: '#eeeeee' }}>
          <text>送信する</text>
        </button>
      </div>
    </div>
  )
}

export default Page
