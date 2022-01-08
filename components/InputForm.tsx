import styles from '../styles/components/InputForm.module.css'

type InputFormType = {
  title: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => { payload: any; type: string; }; 
}

const InputForm = ({ title, value, onChange }: InputFormType) => {
  return (
    <div className={styles.container}>
      <text className={styles.title}>{title}</text>
      <input className={styles.input} type="text" value={value} onChange={onChange}/>
    </div>
  )
}

export default InputForm
