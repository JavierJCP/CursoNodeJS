import { Type } from "@sinclair/typebox"
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import addErrors from 'ajv-errors'

const LoginDTOSchema = Type.Object(
  {
    email: Type.String({
      format: "email",
      errorMessage: {
        type: "Debe ser un string",
        format: "Debe ser un correo electronico valido",
      },
    }),
    password: Type.String({
      errorMessage: {
        type: "Debe ser un string",
      },
    }),
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "El formato del objeto no es valido",
    },
  }
)

const ajv = new Ajv({ allErrors: true })
addFormats(ajv, ["email"])
addErrors(ajv, { keepErrors: false })

const validate = ajv.compile(LoginDTOSchema)

const validateLoginDTO = (req, res, next) => {
  const isDTOValid = validate(req.body)
  if(!isDTOValid) return res
    .status(400)
    .send(ajv.errorsText(validate.errors, { separator: "\n"}))
  next()
}

export default validateLoginDTO