import { useEffect, useState } from "react";
import ErrorSnackBar from "../../../shared/components/snackbar/ErrorSnackBar";
import AppLoaderComponent from "../../../shared/loader/app-loader.component";
import { getErrorMessage } from "../../../shared/service/api-service";
import { ApiResponse } from "../../../shared/types/Response";
import { getStatBenefice, getStatGenerale } from "../../service/stats.service";
import {
  StatBenefice,
  StatGenerale,
  StatProps,
  StatRequest,
} from "../../types/stats.type";
import StatsCard from "../stats-card/stats-card.component";
import StatsChart from "../stats-chart/stats-chart.component";
import "./stats-list-root.component.scss";
interface StatGeneraleState {
  statGenerale: StatGenerale;
  loading: boolean;
  isLoaded: boolean;
  errorMessage: string;
  openError: boolean;
  statBenefice: StatBenefice;
}
const initialState: StatGeneraleState = {
  statBenefice: {
    benefice: 0,
    beneficeMarque: [],
  },
  statGenerale: {
    avgCreationVente: 0,
    nbAnnonce: 0,
    nbVendu: 0,
    beneficeParMois: [
      {
        mois: 1,
        benefice: 0,
      },
      {
        mois: 2,
        benefice: 0,
      },
      {
        mois: 3,
        benefice: 0,
      },
      {
        mois: 4,
        benefice: 0,
      },
      {
        mois: 5,
        benefice: 0,
      },
      {
        mois: 6,
        benefice: 0,
      },
      {
        mois: 7,
        benefice: 0,
      },
      {
        mois: 8,
        benefice: 0,
      },
      {
        mois: 9,
        benefice: 0,
      },
      {
        mois: 10,
        benefice: 0,
      },
      {
        mois: 11,
        benefice: 0,
      },
      {
        mois: 12,
        benefice: 0,
      },
    ],
  },
  loading: true,
  isLoaded: false,
  errorMessage: "",
  openError: false,
};
const StatsGenerales = (props: StatProps) => {
  const [state, setState] = useState<StatGeneraleState>(initialState);
  useEffect(() => {
    console.log("oui");
    console.log(props.monthYear);
    const req: StatRequest = {
      annee: props.monthYear.year(),
      mois: props.monthYear.month() + 1,
    };
    getStatBenefice(req)
      .then((res) => {
        const response: ApiResponse = res.data;
        if (response.ok) {
          setState((state) => ({
            ...state,
            statBenefice: response.data,
            loading: false,
          }));
        } else {
          setState((state) => ({
            ...state,
            loading: false,
            isLoaded: false,
            errorMessage: response.err,
            openError: true,
          }));
        }
      })
      .catch((err) => {
        console.error(err);
        let errorMessage = "";
        if (
          !err.response?.data.err ||
          err.response?.data.err == "" ||
          err.response?.data.err == null
        ) {
          errorMessage = getErrorMessage(err.code);
        } else {
          errorMessage = err.response.data.err;
        }
        setState((state) => ({
          ...state,
          loading: false,
          isLoaded: false,
          errorMessage: errorMessage,
          openError: true,
        }));
      });
    getStatGenerale(req)
      .then((res) => {
        const response: ApiResponse = res.data;
        if (response.ok) {
          setState((state) => ({
            ...state,
            statGenerale: response.data,
          }));
        } else {
          setState((state) => ({
            ...state,
            errorMessage: response.err,
            openError: true,
            idLoaded: false,
            loading: true,
          }));
        }
      })
      .catch((err) => {
        console.error(err);
        let errorMessage = "";
        if (
          !err.response?.data.err ||
          err.response?.data.err == "" ||
          err.response?.data.err == null
        ) {
          errorMessage = getErrorMessage(err.code);
        } else {
          errorMessage = err.response.data.err;
        }
        setState((state) => ({
          ...state,
          loading: true,
          isLoaded: false,
          errorMessage: errorMessage,
          openError: true,
        }));
      });
  }, [props.monthYear]);
  return (
    <>
      <div className="stats_list">
        <StatsCard
          label="Bénéfice"
          data={
            <AppLoaderComponent
              loading={state.loading}
              children={
                <h1 className="light">
                  {state.statBenefice.benefice.toLocaleString()} MGA
                </h1>
              }
            ></AppLoaderComponent>
          }
        />
        <StatsCard
          label="Ecartype entre date d'annonce et vente"
          data={
            <AppLoaderComponent
              loading={state.loading}
              children={
                <h1 className="light">
                  {state.statGenerale.avgCreationVente.toLocaleString()} jours
                </h1>
              }
            />
          }
        />
        <StatsCard
          label="Taux de vente"
          data={
            <AppLoaderComponent
              loading={state.loading}
              children={
                <>
                  <h2 className="light text-left">
                    Annonces: {state.statGenerale.nbAnnonce.toLocaleString()}
                  </h2>
                  <h2 className="light text-left">
                    Ventes: {state.statGenerale.nbVendu.toLocaleString()}
                  </h2>
                </>
              }
            />
          }
        />
      </div>
      <div className="chart">
        <AppLoaderComponent
          loading={state.loading}
          children={
            <StatsChart benefices={state.statGenerale.beneficeParMois} />
          }
        />
      </div>
      <ErrorSnackBar
        open={state.openError}
        error={state.errorMessage}
        onClose={() => {
          setState((state) => ({ ...state, openError: false }));
        }}
      />
    </>
  );
};

export default StatsGenerales;
