import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useForm } from "react-hook-form"
import Panel from "../panel"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

type Field<T> = {
    name: keyof T
    ref: any
}

function fieldFn<T>(register: any): (name: keyof T) => Field<T> {
    return (name: keyof T) => ({ name, ref: register })
}

type FormSchema = {
    firstName: string
    age: number
}

const schema = yup
    .object()
    .shape({
        firstName: yup.string().required(),
        age: yup.number().positive().integer().required(),
    })
    .defined()

const WrapperForm: React.FC = () => {
    const [result, setResult] = useState<FormSchema | null>(null)

    const { register, handleSubmit, errors } = useForm<FormSchema>({
        resolver: yupResolver(schema),
    })
    const field = fieldFn<FormSchema>(register)
    const onSubmit = handleSubmit((data) => setResult(data))

    return (
        <Panel summary={<Summary />}>
            <Form onSubmit={onSubmit} className="m-3" autoComplete="off">
                <div className="d-flex flex-column" style={{ rowGap: "1rem" }}>
                    <div>
                        <label>Nome</label>
                        <Form.Control isInvalid={!!errors.firstName} {...field("firstName")} />
                        {errors.firstName && <small className="text-danger">{errors.firstName.message}</small>}
                    </div>

                    <div>
                        <label>Età</label>
                        <Form.Control isInvalid={!!errors.age} {...field("age")} />
                        {errors.age && <small className="text-danger">{errors.age.message}</small>}
                    </div>
                </div>

                <div className="mt-3 d-flex justify-content-between">
                    <Button variant="primary" type="submit">
                        Invia
                    </Button>
                </div>
            </Form>

            {result && <p className="mt-3 alert alert-success">{JSON.stringify(result)}</p>}
        </Panel>
    )
}

const Summary: React.FC = () => (
    <>
        <p className="mb-1">- All yup form features</p>
        <p className="mb-1">- Custom wrapper (react-formist style) to react-hook-form api</p>
        <p className="mb-1 text-success">- Less error prone</p>
        <p className="mb-1 text-danger">- Powerful if used with third party validator</p>
    </>
)

export default WrapperForm
