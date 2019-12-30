import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton
} from '@ionic/react'
import React from 'react'
import { Formik, Form, Field, ErrorMessage, FormikErrors } from 'formik'

const encode = (data: any) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

interface FormValues {
  email: string
}

const Home: React.FC = () => {
  const initialValues: FormValues = { email: '' }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton>
              {' '}
              <div data-netlify-identity-menu></div>
            </IonButton>
          </IonButtons>
          <IonTitle>EVG</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <Formik
          initialValues={initialValues}
          validate={(values: FormValues) => {
            const errors: FormikErrors<FormValues> = { email: '' }
            if (!values.email) {
              errors.email = 'Required'
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address'
            }
            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              fetch('/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: encode({ 'evg-form': 'contact', values })
              })
                .then(() => alert('Success!'))
                .catch(error => alert(error))
              setSubmitting(false)
            }, 400)
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </IonContent>
    </IonPage>
  )
}

export default Home
