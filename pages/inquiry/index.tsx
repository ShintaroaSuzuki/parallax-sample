import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux'
import { selectForm, changeName, changeMailAddress, changeInquiry } from '../../store/formState'
import styles from '../../styles/Inquiry.module.css'
import InputForm from '../../components/InputForm'
import TextAreaForm from '../../components/TextAreaForm'
import Button from '../../components/Button'

const Page = () => {
  const { name, mailAddress, inquiry } = useSelector(selectForm)
  const dispatch = useDispatch();

  const submitForm = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (!!name && !!mailAddress) {
      e.preventDefault()
      const response = await fetch('/api/notion', {
        method: 'POST',
        body: JSON.stringify({ name, mailAddress, inquiry })
      })
      const data = await response.json();
      console.log(data)
      fetch('api/discord', {
        method: 'POST',
        body: JSON.stringify({ name, mailAddress, inquiry })
      })
    }
  }

  return (
    <div className={styles.container}>
      <InputForm title="お名前" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeName(e.target.value))} />
      <InputForm title="メールアドレス" value={mailAddress} onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeMailAddress(e.target.value))} />
      <TextAreaForm title="お問い合わせ" value={inquiry} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => dispatch(changeInquiry(e.target.value))} />
      <div style={{ marginBottom: 48 }}>
        <text>{(!!name && !!mailAddress) ? 'OK' : '必須項目が足りません'}</text>
      </div>
      <Button onClick={submitForm} />
    </div>
  )
}

export default Page
