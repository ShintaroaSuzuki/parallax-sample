import styles from '../styles/components/Button.module.css'

type ButtonType = {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => Promise<void>; 
}

const Button = ({ onClick }: ButtonType) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <text className={styles.text}>送信する</text>
    </div>
  )
}

export default Button
