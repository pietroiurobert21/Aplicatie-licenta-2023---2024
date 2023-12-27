import style from './RegisterToCompany.module.css';
import { TextInput, Button } from 'evergreen-ui';

export default function RegisterToCompany(props) {
    return (
        <>
            <div className={style.card1}>
                <h3> Join a company </h3>
                <TextInput name="text-input-code" placeholder="Company Code" />
                <Button appearance="primary" intent="success" style={{width: "17.5rem", fontSize:"1rem"}}> Join Company </Button>            
            </div>

            <div className={style.card2}>
                <h5> or create one </h5>
                <TextInput name="text-input-company" placeholder="Company Name" />
                <TextInput name="text-input-employees" type="number" placeholder="Number of employees"/>
                <Button appearance="default" intent="success" style={{width: "17.5rem", fontSize:"1rem"}}> Create Company </Button>
                <Button appearance="default" intent="danger" style={{width: "17.5rem", fontSize:"1rem"}}
                    onClick={props.onClickBack}> Cancel </Button>
            </div>
        </>
    )
}