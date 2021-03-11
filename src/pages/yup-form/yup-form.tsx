import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Form, Button } from "react-bootstrap"

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

const YupForm: React.FC = () => {
    const [result, setResult] = useState<FormSchema | null>(null)

    const { register, handleSubmit, errors } = useForm<FormSchema>({
        resolver: yupResolver(schema),
    })
    const onSubmit = handleSubmit((data) => setResult(data))

    return (
        <div className="mx-5 row">
            <div className="col-8">
                <Form onSubmit={onSubmit} className="m-3" autoComplete="off">
                    <div className="d-flex flex-column" style={{ rowGap: "1rem" }}>
                        <div>
                            <label>Nome</label>
                            <Form.Control name="firstName" isInvalid={!!errors.firstName} ref={register} />
                            {errors.firstName && <small className="text-danger">{errors.firstName.message}</small>}
                        </div>

                        <div>
                            <label>Età</label>
                            <Form.Control name="age" isInvalid={!!errors.age} ref={register} />
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
            </div>

            <div className="col m-3 alert alert-info">
                <p className="mb-1">
                    - Require additional libs <span className="badge badge-secondary mr-1">@hookform/resolvers</span>
                    <span className="badge badge-secondary">yup</span>
                </p>
                <p className="mb-1">
                    - Yup as custom validator &#40;
                    <a href="https://react-hook-form.com/get-started#SchemaValidation">docs</a>&#41;
                </p>
                <p className="mb-1">- Errors from yup validation</p>
            </div>
        </div>
    )
}

export default YupForm
