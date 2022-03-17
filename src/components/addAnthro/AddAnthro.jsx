import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate, useLocation } from "react-router-dom";

// material
import {
  Stack,
  TextField,
  Select,
  styled,
  TextareaAutosize,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import Axios from "axios";
import { fakeAuth } from "../../fakeAuth";
import style from "../_dashboard/patient/PatientForm/patient.module.css";

// ----------------------------------------------------------------------
const Div = styled("div")(() => ({
  // height: '90%',
  // width: '100%',
  boxShadow: "0px 0px 15px -10px rgb(0 0 0 / 75%)",
  width: "80%",
  position: "relative",
  borderRadius: "15px",
  padding: "30px",
  paddingBottom: "90px",
  left: "50%",
  transform: "translate(-50%,0)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
}));

const SubDivContenaire = styled("div")(() => ({
  width: "100%",
  position: "relative",
  // left: '60%',
  // transform: 'translate(-50%,0)',
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

export default function AddAnthro({ id, admission }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { from } = location.state || { from: { pathname: "/dashboard/app" } };
  const RegisterSchema = Yup.object().shape({
    weight: Yup.number().required("Poids requis"),
    height: Yup.number().required("Taille requise"),
    brachial: Yup.number().required("Périmètre brachial requis"),
    cranian: Yup.number(),
    malnutrition: Yup.string().required(),
    ration: Yup.boolean(),
    commentaires: Yup.string(),
    admission: Yup.date(),
  });

  const formik = useFormik({
    initialValues: {
      weight: "",
      height: "",
      brachial: "",
      cranian: "",
      malnutrition: "",
      ration: "false",
      commentaires: "",
      admission: admission,
      // checked: false
    },
    validationSchema: RegisterSchema,
    onSubmit: ({
      weight,
      height,
      brachial,
      cranian,
      malnutrition,
      ration,
      commentaires,
      admission,
    }) => {
      console.log({
        weight,
        height,
        brachial,
        cranian,
        malnutrition,
        ration,
        commentaires,
      });
      Axios.post(
        `https://kesho-api.herokuapp.com/anthropometrique?id_patient=${id}`,
        {
          peri_cranien: cranian,
          peri_brachial: brachial,
          poids: weight,
          taille: height,
          type_malnutrition: malnutrition,
          ration_seche: ration,
          commentaires: commentaires,
          date_admission_patient: admission,
          // declarer_gueri: checked
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then(() => {
          fakeAuth.login(() => {
            navigate(from);
            navigate(`/dashboard/patient/detail_patient/${id}`, {
              replace: true,
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const {
    errors,
    setFieldValue,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    values,
  } = formik;
  const [rationSeche, setRationSeche] = useState("false");
  const handleChangeRationPatient = (event) => {
    const { value } = event.target;
    setFieldValue("ration", value);
    setRationSeche(value);
    console.log(rationSeche);
  };
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Div>
          <SubDivContenaire>
            <Stack spacing={3}>
              <TextField
                sx={{ width: "100%", padding: "2px" }}
                fullWidth
                value={values.weight}
                label="Poids (kg)"
                {...getFieldProps("weight")}
                helperText={touched.weight && errors.weight}
                error={Boolean(touched.weight && errors.weight)}
              />
              <TextField
                sx={{ width: "100%", padding: "2px" }}
                fullWidth
                value={values.height}
                label="Taille (cm) "
                {...getFieldProps("height")}
                helperText={touched.height && errors.height}
                error={Boolean(touched.height && errors.height)}
              />
              <TextField
                sx={{ width: "100%", padding: "2px" }}
                fullWidth
                value={values.cranian}
                label="Périmètre crânien (cm) "
                {...getFieldProps("cranian")}
                helperText={touched.cranian && errors.cranian}
                error={Boolean(touched.cranian && errors.cranian)}
              />
              <TextField
                sx={{ width: "100%", padding: "2px" }}
                fullWidth
                label="Périmètre brachial(cm)"
                value={values.brachial}
                {...getFieldProps("brachial")}
                helperText={touched.brachial && errors.brachial}
                error={Boolean(touched.brachial && errors.brachial)}
              />
              <RadioGroup
                onChange={handleChangeRationPatient}
                error={Boolean(touched.ration && errors.ration)}
                helperText={touched.ration && errors.ration}
                // setValues={  DataPatient.Sexe}
              >
                <Stack
                  direction={{ xs: "column", md: "column", sm: "row" }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "10px",
                    border: `${
                      Boolean(touched.ration && errors.ration) &&
                      "1px solid red"
                    }`,
                    borderRadius: `${
                      Boolean(touched.ration && errors.ration) && "10px"
                    }`,
                  }}
                  spacing={1}
                >
                  <FormLabel component="label">Oedème:</FormLabel>
                  <Stack direction={{ xs: "row", sm: "row" }}>
                    <FormControlLabel
                      value="false"
                      control={<Radio checked={values.ration === "false"} />}
                      label="Oui"
                    />
                    <FormControlLabel
                      value="true"
                      control={<Radio checked={values.ration === "true"} />}
                      label="Non"
                    />
                  </Stack>
                </Stack>
              </RadioGroup>
              <Select
                native
                sx={{ width: "100%", padding: "2px" }}
                value={values.malnutrition}
                {...getFieldProps("malnutrition")}
                error={Boolean(touched.malnutrition && errors.malnutrition)}
              >
                <option value="" selected disabled hidden>
                  Type de malnutrition
                </option>
                <option value="MAM">Malnutrition aigue modérée</option>
                <option value="MAS-M">Malnutrition aigue sévère marasme</option>
                <option value="MAS-K">
                  Malnutrition aigue sévère kwashiorkor
                </option>
                <option value="MC">Malnutrition chronique</option>
                <option value="Guéri">Declaré guéri</option>
              </Select>
              <TextareaAutosize
                minRows={8}
                maxRows={8}
                value={values.commentaires}
                {...getFieldProps("commentaires")}
                placeholder="Observations sur le patient"
                className={style.textarea}
                helperText={touched.commentaires && errors.commentaires}
                error={Boolean(touched.commentaires && errors.commentaires)}
              />
              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
                sx={{ width: 200, margin: "auto", marginTop: "40px" }}
              >
                Ajouter
              </LoadingButton>
            </Stack>
          </SubDivContenaire>
        </Div>
      </Form>
    </FormikProvider>
  );
}
