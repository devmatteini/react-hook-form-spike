import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { teamOptions, positionRegex } from "./helpers"

export enum Team {
    Fiorentina = "FIORENTINA",
    AtleticoMadrid = "ATLETICO_MADRID",
    Liverpool = "LIVERPOOL",
}

type FormSchema = {
    name: string
    team: Team
    position?: string
}

const SimpleForm: React.FC = () => {
    const [result, setResult] = useState<FormSchema | null>(null)

    const { register, handleSubmit, errors } = useForm<FormSchema>()
    const onSubmit = handleSubmit((data) => setResult(data))

    return (
        <div className="container w-50">
            <Form onSubmit={onSubmit} className="m-3" autoComplete="off">
                <div className="d-flex flex-column" style={{ rowGap: "1rem" }}>
                    <div>
                        <label>Nome</label>
                        <Form.Control name="name" isInvalid={!!errors.name} ref={register({ required: true })} />
                        {errors.name && <small className="text-danger">Campo obbligatorio</small>}
                    </div>

                    <div>
                        <label>Squadra</label>
                        <Form.Control
                            as="select"
                            name="team"
                            isInvalid={!!errors.team}
                            ref={register({ required: true })}
                        >
                            {teamOptions.map((x) => (
                                <option key={x.value} value={x.value}>
                                    {x.label}
                                </option>
                            ))}
                        </Form.Control>
                        {errors.team && <small className="text-danger">Campo obbligatorio</small>}
                    </div>

                    <div>
                        <label>Posizione</label>
                        <Form.Control
                            name="position"
                            isInvalid={!!errors.position}
                            ref={register({ pattern: positionRegex })}
                        />
                        {errors.position && <small className="text-danger">Posizione non valida</small>}
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
    )
}

export default SimpleForm
