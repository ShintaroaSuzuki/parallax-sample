import styles from '../styles/components/TextAreaForm.module.css'

type TextAreaFormType = {
  title: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => { payload: any; type: string; }; 
}

const TextAreaForm = ({ title, value, onChange }: TextAreaFormType) => {
  return (
    <div className={styles.container}>
      <text className={styles.text}>{title}</text>
      <textarea className={styles.textarea} value={value} onChange={onChange}/>
    </div>
  )
}

export default TextAreaForm
