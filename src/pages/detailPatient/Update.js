import { useState } from "react";
import {
  InputLabel,
  Stack,
  Avatar,
  Grid,
  Card,
  Button,
  Container,
  Typography,
  TextField,
  Select,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import {
  Link as RouterLink,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Axios from "axios";
import moment from "moment";
import { LoadingButton } from "@material-ui/lab";
import { Icon } from "@iconify/react";
import { Delete, Edit } from "@material-ui/icons";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import style from "./Details.css";

export default function Update({ id }) {
  const [identityEnabled, setIdentityEnabled] = useState(false);
  const [malnutritionEnabled, setMalnutritionEnabled] = useState(false);
  const [mereEnabled, setMereEnabled] = useState(false);
  const [pereEnabled, setPereEnabled] = useState(false);
  const [menageEnabled, setMenageEnabled] = useState(false);
  const date = new Date();
  const RegisterSchema = Yup.object().shape({});

  const formik = useFormik({
    initialValues: {},
    validationSchema: RegisterSchema,
    onSubmit: (patient) => {
      try {
      } catch (e) {
        console.log(e);
      }
    },
  });
  const { errors, setFieldValue, touched, values, handleSubmit, isSubmitting } =
    formik;

  return (
    <div>
      <Button
        variant="outlined"
        component={RouterLink}
        to="/dashboard/patient"
        // onClick={(e) => exportToCSV(allData, exportedFileName)}
        startIcon={<Icon icon="bx:bx-arrow-back" />}
      >
        Retour
      </Button>
      <FormikProvider value={formik}>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={11} sm={5} md={5} sx={{ border: `0px solid green` }}>
              <Card
                sx={{
                  margin: 1,
                  padding: 2,
                  height: "100%",
                }}
              >
                <Typography
                  sx={{
                    width: `100%`,
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "900",
                    fontSize: "larger",
                    marginBottom: "2%",
                  }}
                >
                  Identité
                  <Button
                    sx={{ border: `0px solid red` }}
                    onClick={(e) => {
                      setIdentityEnabled(!identityEnabled);
                    }}
                  >
                    <Edit />
                  </Button>
                </Typography>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "nowrap",
                    gap: "14px",
                  }}
                >
                  <div
                    style={{
                      border: `1px solid black`,
                      width: `50%`,
                      height: `200px`,
                    }}
                  >
                    <label
                      for="firstPicture"
                      style={{
                        width: "100%",
                        height: "100%",
                        margin: "2%, auto",
                      }}
                    >
                      <Avatar
                        alt="avant"
                        src={``}
                        variant="square"
                        sx={{ width: `100%`, height: `100%` }}
                      />
                    </label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      name="firstPicture"
                      id="firstPicture"
                      disabled={!identityEnabled}
                      style={{ display: "none" }}
                    />
                    <span
                      style={{
                        width: `100%`,
                        padding: `10% auto`,
                        border: `0px red solid`,
                        color: `red`,
                        fontWeight: `700`,
                      }}
                    >
                      AVANT
                    </span>
                  </div>
                  <div
                    style={{
                      border: `1px solid black`,
                      width: `50%`,
                      height: `200px`,
                    }}
                  >
                    <label
                      for="lastPicture"
                      style={{
                        width: "100%",
                        height: "100%",
                        margin: "auto",
                      }}
                    >
                      <Avatar
                        alt="apres"
                        src={``}
                        variant="square"
                        sx={{ width: `100%`, height: `100%` }}
                      />
                    </label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      name="lastPicture"
                      id="lastPicture"
                      disabled={!identityEnabled}
                      style={{ display: "none" }}
                    />
                    <span
                      style={{
                        width: `100%`,
                        padding: `10% auto`,
                        border: `0px red solid`,
                        color: `green`,
                        fontWeight: `700`,
                      }}
                    >
                      APRES
                    </span>
                  </div>
                </Stack>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `10%`,
                  }}
                >
                  Prenom :{" "}
                  <input
                    type="text"
                    name="firstName"
                    disabled={!identityEnabled}
                    className="inputDisabled"
                  />
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Nom :{" "}
                  <input
                    type="text"
                    name="firstName"
                    disabled={!identityEnabled}
                    className="inputDisabled"
                  />
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Postnom :{" "}
                  <input
                    type="text"
                    name="lastName"
                    disabled={!identityEnabled}
                    className="inputDisabled"
                  />
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Sexe :{" "}
                  {/* <input type="text" name="gender" className="inputDisabled" /> */}
                  <select
                    className="selectDisabled"
                    disabled={!identityEnabled}
                    name="gender"
                  >
                    <option value="M">M</option>
                    <option value="F">F</option>
                  </select>
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Date de naissance :{" "}
                  <input
                    type="date"
                    name="birthdate"
                    disabled={!identityEnabled}
                    className="inputDisabled"
                  />
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Provenance :{" "}
                  <input
                    type="text"
                    name="arrival"
                    disabled={!identityEnabled}
                    className="inputDisabled"
                  />
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Mode d'arrivé :{" "}
                  <input
                    type="text"
                    name="arrivalMode"
                    disabled={!identityEnabled}
                    className="inputDisabled"
                  />
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Adresse :{" "}
                  <input
                    type="text"
                    name="adress"
                    disabled={!identityEnabled}
                    className="inputDisabled"
                  />
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Vit avec ses parents :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!identityEnabled}
                    name="liveWithParents"
                  >
                    <option value="Oui">Oui</option>
                    <option value="Non">Non</option>
                  </select>
                  {/* <input
                    type="text"
                    name="liveWithParents"
                    className="inputDisabled"
                  /> */}
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Tuteur :{" "}
                  <input
                    type="text"
                    name="tutor"
                    disabled={!identityEnabled}
                    className="inputDisabled"
                  />
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Rang fratrie :{" "}
                  <input
                    type="text"
                    name="rankInSiblings"
                    disabled={!identityEnabled}
                    className="inputDisabled"
                  />
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Taille Fratrie :{" "}
                  <input
                    type="text"
                    name="siblingsNumber"
                    disabled={!identityEnabled}
                    className="inputDisabled"
                  />
                </InputLabel>{" "}
                {!identityEnabled === true ? (
                  <></>
                ) : (
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    size="large"
                    sx={{ width: 200, marginLeft: "20px", marginTop: "20px" }}
                  >
                    Mettre à jour
                  </LoadingButton>
                )}
              </Card>
            </Grid>
            <Grid
              item
              xs={11}
              sm={5}
              md={5}
              sx={{ display: `flex`, border: `0px solid green` }}
            >
              <Card
                sx={{
                  margin: 1,
                  padding: 2,
                  border: `0px solid red`,
                }}
              >
                <Typography
                  sx={{
                    width: `100%`,
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "900",
                    fontSize: "larger",
                    marginBottom: "0.5%",
                  }}
                >
                  Cause malnutrition
                  <Button
                    sx={{ border: `0px solid red` }}
                    onClick={(e) => {
                      setMalnutritionEnabled(!malnutritionEnabled);
                    }}
                  >
                    <Edit />
                  </Button>
                </Typography>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0%`,
                  }}
                >
                  Terme grossesse :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!malnutritionEnabled}
                    name="termeGros"
                  >
                    <option value="A terme">A terme</option>
                    <option value="Prématuré">Prématuré</option>
                  </select>
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  EIG :{" "}
                  <input
                    type="text"
                    name="firstName"
                    disabled={!malnutritionEnabled}
                    className="inputDisabled"
                  />
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Lieu d'accouchement :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!malnutritionEnabled}
                    name="lieuAccouch"
                  >
                    <option value="Voiture">Voiture</option>
                    <option value="Docmicile">Docmicile</option>
                    <option value="Structure sanitaire">
                      Structure sanitaire
                    </option>
                  </select>
                  {/* <input
                    type="text"
                    name="lastName"
                    disabled={!malnutritionEnabled}
                    className="inputDisabled"
                  /> */}
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Asphyxie périnatale :{" "}
                  {/* <input type="text" name="gender" className="inputDisabled" /> */}
                  <select
                    className="selectDisabled"
                    disabled={!malnutritionEnabled}
                    name="asphixieperi"
                  >
                    <option value="Pas de cri">Pas de cri</option>
                    <option value="A crié spontanément">
                      A crié spontanément
                    </option>
                    <option value="Cri apres réanimation">
                      Cri apres réanimation
                    </option>
                  </select>
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  DPM :{" "}
                  <input
                    type="text"
                    name="dpm"
                    disabled={!malnutritionEnabled}
                    className="inputDisabled"
                  />
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Séjour en Neonat :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!malnutritionEnabled}
                    name="neonat"
                  >
                    <option value="Oui">Oui</option>
                    <option value="Non">Non</option>
                  </select>
                  {/* <input
                    type="text"
                    name="arrival"
                    disabled={!malnutritionEnabled}
                    className="inputDisabled"
                  /> */}
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Poids naissance :{" "}
                  <input
                    type="text"
                    name="poids"
                    disabled={!malnutritionEnabled}
                    className="inputDisabled"
                  />
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Allaitement Exclusif :{" "}
                  <input
                    type="text"
                    name="allaitement"
                    disabled={!malnutritionEnabled}
                    className="inputDisabled"
                  />
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Age diversification aliment :{" "}
                  <input
                    type="text"
                    name="diversificcation"
                    className="inputDisabled"
                  />
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Constitution aliment :{" "}
                  <input
                    type="text"
                    name="constitution"
                    disabled={!malnutritionEnabled}
                    className="inputDisabled"
                  />
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Consommation poisson :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!malnutritionEnabled}
                    name="consoPoisson"
                  >
                    <option value="Oui">Oui</option>
                    <option value="Non">Non</option>
                  </select>
                  {/* <input
                    type="text"
                    name="rankInSiblings"
                    disabled={!malnutritionEnabled}
                    className="inputDisabled"
                  /> */}
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Calendrier vaccinal :{" "}
                  <input
                    type="text"
                    name="siblingsNumber"
                    disabled={!malnutritionEnabled}
                    className="inputDisabled"
                  />
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  ATCD Rougeole :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!malnutritionEnabled}
                    name="atcdRougeole"
                  >
                    <option value="Oui">Oui</option>
                    <option value="Non">Non</option>
                  </select>
                  {/* <input
                    type="text"
                    name="siblingsNumber"
                    disabled={!malnutritionEnabled}
                    className="inputDisabled"
                  /> */}
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  ATCD MAS :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!malnutritionEnabled}
                    name="atcdMas"
                  >
                    <option value="Oui">Oui</option>
                    <option value="Non">Non</option>
                  </select>
                  {/* <input
                    type="text"
                    name="siblingsNumber"
                    disabled={!malnutritionEnabled}
                    className="inputDisabled"
                  /> */}
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  ATCD TBC :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!malnutritionEnabled}
                    name="atcdTBC"
                  >
                    <option value="Oui">Oui</option>
                    <option value="Non">Non</option>
                  </select>
                  {/* <input
                    type="text"
                    name="siblingsNumber"
                    disabled={!malnutritionEnabled}
                    className="inputDisabled"
                  /> */}
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Transfert en UNT :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!malnutritionEnabled}
                    name="transferToUNT"
                  >
                    <option value="Oui">Oui</option>
                    <option value="Non">Non</option>
                  </select>
                  {/* <input
                    type="text"
                    name="transferToUNT"
                    className="inputDisabled"
                  /> */}
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Hospitalisation recente :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!malnutritionEnabled}
                    name="hospital"
                  >
                    <option value="Oui">Oui</option>
                    <option value="Non">Non</option>
                  </select>
                  {/* <input
                    type="text"
                    name="transferToUNT"
                    className="inputDisabled"
                  /> */}
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Diagnostique Hospitalisation :{" "}
                  <input type="text" name="diagno" className="inputDisabled" />
                </InputLabel>
                {!malnutritionEnabled === true ? (
                  <></>
                ) : (
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    size="large"
                    sx={{ width: 200, marginLeft: "20px", marginTop: "20px" }}
                  >
                    Mettre à jour
                  </LoadingButton>
                )}
              </Card>
            </Grid>{" "}
            <Grid
              item
              xs={11}
              sm={5}
              md={5}
              sx={{ display: `flex`, border: `0px solid green` }}
            >
              <Card
                sx={{
                  margin: 1,
                  padding: 2,
                  border: `0px solid red`,
                }}
              >
                <Typography
                  sx={{
                    width: `100%`,
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "900",
                    fontSize: "larger",
                    marginBottom: "0.5%",
                  }}
                >
                  Famille
                </Typography>
                <Typography
                  sx={{
                    width: `100%`,
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.5%",
                  }}
                >
                  Mère
                  <Button
                    sx={{ border: `0px solid red` }}
                    onClick={(e) => {
                      setMereEnabled(!mereEnabled);
                    }}
                  >
                    <Edit />
                  </Button>
                </Typography>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0%`,
                  }}
                >
                  Mère en vie :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!mereEnabled}
                    name="mereVit"
                  >
                    <option value="Oui">Oui</option>
                    <option value="Non">Non</option>
                  </select>
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Age de la mère :{" "}
                  <input
                    type="text"
                    name="ageMere"
                    disabled={!mereEnabled}
                    className="inputDisabled"
                  />
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Statut marital :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!mereEnabled}
                    name="statutMaritalMere"
                  >
                    <option value="Non mariée">Non mariée</option>
                    <option value="Mariée">Mariée</option>
                    <option value="Divorcée">Divorcée</option>
                    <option value="Veuve">Veuve</option>
                  </select>
                  {/* <input
                    type="text"
                    name="diversificcation"
                    className="inputDisabled"
                  /> */}
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Etat de la mère :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!mereEnabled}
                    name="etatMere"
                  >
                    <option value="Aucun">Aucun</option>
                    <option value="Enceinte">Enceinte</option>
                    <option value="Allaitante">Allaitante</option>
                    <option value="Enceinte et Allaitante">
                      Enceinte et Allaitante
                    </option>
                  </select>
                  {/* <input
                    type="text"
                    name="lastName"
                    disabled={!mereEnabled}
                    className="inputDisabled"
                  /> */}
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Contraception :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!mereEnabled}
                    name="contraception"
                  >
                    <option value="Oui">Oui</option>
                    <option value="Non">Non</option>
                  </select>
                  {/* <input
                    type="text"
                    name="arrival"
                    disabled={!mereEnabled}
                    className="inputDisabled"
                  /> */}
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Type contraception :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!mereEnabled}
                    name="moyenContraception"
                  >
                    <option value="Naturel">Naturel</option>
                    <option value="Moderne">Moderne</option>
                    <option value="Naturel et Moderne">
                      Naturel et Moderne
                    </option>
                  </select>
                  {/* <input
                    type="text"
                    name="moyenContraception"
                    disabled={!mereEnabled}
                    className="inputDisabled"
                  /> */}
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Methode de contraception :{" "}
                  <input
                    type="text"
                    name="methodContraception"
                    disabled={!mereEnabled}
                    className="inputDisabled"
                  />
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Scolarité mère :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!mereEnabled}
                    name="scolariteMere"
                  >
                    <option value="Analphabète">Analphabète</option>
                    <option value="Primaire">Primaire</option>
                    <option value="Secondaire">Secondaire</option>
                    <option value="Universitaire">Universitaire</option>
                  </select>
                  {/* <input
                    type="text"
                    name="poids"
                    disabled={!mereEnabled}
                    className="inputDisabled"
                  /> */}
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Profession :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!mereEnabled}
                    name="professionMere"
                  >
                    <option value="Ménagère">Ménagère</option>
                    <option value="Salariée formelle,infirmière,Ong,enseignante">
                      Salariée formelle (infirmière, enseignante, ONG.)
                    </option>
                    <option value="Travail à temps partiel (maçonne, menuisière)">
                      Travail à temps partiel (maçonne, menuisière)
                    </option>
                    <option value="Business (exploitante minier, petit commerce, etc.) ">
                      Business (exploitante minier, petit commerce, etc.)
                    </option>
                    <option value="Militaire/Policière">
                      Militaire/Policière
                    </option>
                    <option value="Sans profession (sans emploi)">
                      Sans profession (sans emploi)
                    </option>
                    <option value="Cultivatrice">Cultivatrice</option>
                    <option value="Autre">Autre</option>
                  </select>
                  {/* <input
                    type="text"
                    name="allaitement"
                    disabled={!mereEnabled}
                    className="inputDisabled"
                  /> */}
                </InputLabel>{" "}
                {!mereEnabled === true ? (
                  <></>
                ) : (
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    size="large"
                    sx={{ width: 200, marginLeft: "20px", marginTop: "20px" }}
                  >
                    Mettre à jour
                  </LoadingButton>
                )}
                <Typography
                  sx={{
                    width: `100%`,
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "5%",
                  }}
                >
                  Père
                  <Button
                    sx={{ border: `0px solid red` }}
                    onClick={(e) => {
                      setPereEnabled(!pereEnabled);
                    }}
                  >
                    <Edit />
                  </Button>
                </Typography>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0%`,
                  }}
                >
                  Père en vie :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!pereEnabled}
                    name="pereVit"
                  >
                    <option value="Oui">Oui</option>
                    <option value="Non">Non</option>
                  </select>
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Age du Chef de ménage :{" "}
                  <input
                    type="text"
                    name="agePere"
                    disabled={!pereEnabled}
                    className="inputDisabled"
                  />
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Téléphone :{" "}
                  <input
                    type="text"
                    name="tel"
                    disabled={!pereEnabled}
                    className="inputDisabled"
                  />
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Profession :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!pereEnabled}
                    name="professionPere"
                  >
                    <option value="Salarié formel,infirmier,Ong,enseignant">
                      Salarié formel (infirmier, enseignant, ONG.)
                    </option>
                    <option value="Travail à temps partiel (maçon, menuisier)">
                      Travail à temps partiel (maçon, menuisier)
                    </option>
                    <option value="Business (exploitant minier, petit commerce, etc.) ">
                      Business (exploitant minier, petit commerce, etc.)
                    </option>
                    <option value="Militaire/Policier">
                      Militaire/Policier
                    </option>
                    <option value="Sans profession (sans emploi)">
                      Sans profession (sans emploi)
                    </option>
                    <option value="Cultivateur">Cultivateur</option>
                    <option value="Autre">Autre</option>
                  </select>
                  {/* <input
                    type="text"
                    name="allaitement"
                    disabled={!pereEnabled}
                    className="inputDisabled"
                  /> */}
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Nombre de femme :{" "}
                  <input
                    type="text"
                    name="nombreFemmes"
                    className="inputDisabled"
                  />
                </InputLabel>
                {!pereEnabled === true ? (
                  <></>
                ) : (
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    size="large"
                    sx={{ width: 200, marginLeft: "20px", marginTop: "20px" }}
                  >
                    Mettre à jour
                  </LoadingButton>
                )}
                <Typography
                  sx={{
                    width: `100%`,
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "5%",
                  }}
                >
                  Ménage
                  <Button
                    sx={{ border: `0px solid red` }}
                    onClick={(e) => {
                      setMenageEnabled(!menageEnabled);
                    }}
                  >
                    <Edit />
                  </Button>
                </Typography>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0%`,
                  }}
                >
                  Taille ménage :{" "}
                  <input
                    type="text"
                    name="taillesMenage"
                    disabled={!menageEnabled}
                    className="inputDisabled"
                  />
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Tribu :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!menageEnabled}
                    name="tribu"
                  >
                    <option value="Havu">Havu</option>
                    <option value="Shi">Shi</option>
                    <option value="Rega">Rega</option>
                    <option value="Autre ethnie du sud-kivu">
                      Autre ethnie du sud-kivu
                    </option>
                    <option value="Autre ethnie du pays et autres">
                      Autre ethnie du pays et autres
                    </option>
                  </select>
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Réligion :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!menageEnabled}
                    name="religion"
                  >
                    <option value="Catholique">Catholique</option>
                    <option value="Protestant">Protestant</option>
                    <option value="Musulman">Musulman</option>
                    <option value="Autres">Autres</option>
                  </select>
                  {/* <input
                    type="text"
                    name="lastName"
                    disabled={!pereEnabled}
                    className="inputDisabled"
                  /> */}
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Niveau socio-eco :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!menageEnabled}
                    name="niveauSocioEco"
                  >
                    <option value="Bas">Bas (Inferieur à 1$)</option>
                    <option value="Moyen">Moyen (5$)</option>
                    <option value="Bon">Bon (Supérieur à 5$)</option>
                  </select>
                  {/* <input
                    type="text"
                    name="allaitement"
                    disabled={!pereEnabled}
                    className="inputDisabled"
                  /> */}
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Nombre repas journalier :{" "}
                  <input
                    type="text"
                    name="nombreRepas"
                    disabled={!menageEnabled}
                    className="inputDisabled"
                  />
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Possession Tele/Radio :{" "}
                  {/* <input type="text" name="gender" className="inputDisabled" /> */}
                  <select
                    className="selectDisabled"
                    disabled={!menageEnabled}
                    name="possessionTV"
                  >
                    <option value="Oui">Oui</option>
                    <option value="Non">Non</option>
                  </select>
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Terrain VIH :{" "}
                  {/* <input type="text" name="gender" className="inputDisabled" /> */}
                  <select
                    className="selectDisabled"
                    disabled={!menageEnabled}
                    name="possessionTV"
                  >
                    <option value="Oui">Oui</option>
                    <option value="Non">Non</option>
                  </select>
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  TBC Chez Parents :{" "}
                  {/* <input type="text" name="gender" className="inputDisabled" /> */}
                  <select
                    className="selectDisabled"
                    disabled={!menageEnabled}
                    name="possessionTV"
                  >
                    <option value="Oui">Oui</option>
                    <option value="Non">Non</option>
                  </select>
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  ATCD de TBC dans la fratrie :{" "}
                  {/* <input type="text" name="gender" className="inputDisabled" /> */}
                  <select
                    className="selectDisabled"
                    disabled={!menageEnabled}
                    name="possessionTV"
                  >
                    <option value="Oui">Oui</option>
                    <option value="Non">Non</option>
                  </select>
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                    marginBottom: "25px",
                  }}
                >
                  ATCD de Rougeole dans la fratrie :{" "}
                  {/* <input type="text" name="gender" className="inputDisabled" /> */}
                  <select
                    className="selectDisabled"
                    disabled={!menageEnabled}
                    name="possessionTV"
                  >
                    <option value="Oui">Oui</option>
                    <option value="Non">Non</option>
                  </select>
                </InputLabel>
                {!menageEnabled === true ? (
                  <></>
                ) : (
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    size="large"
                    sx={{
                      width: 200,
                      marginLeft: "20px",
                      marginBottom: "25px",
                    }}
                  >
                    Mettre à jour
                  </LoadingButton>
                )}
              </Card>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </div>
  );
}
