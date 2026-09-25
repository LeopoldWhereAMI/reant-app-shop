import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "react-email";

type VerifyEmailProps = {
  username: string;
  verifyUrl: string;
};

export default function VerifyEmail({ username, verifyUrl }: VerifyEmailProps) {
  return (
    <Html>
      <Head />

      <Preview>Подтвердите email для RentApp Shop</Preview>

      <Body>
        <Container>
          <Heading>Подтвердите ваш email</Heading>

          <Text>Здравствуйте, {username}!</Text>

          <Text>Для завершения регистрации подтвердите ваш email.</Text>

          <Section>
            <Button href={verifyUrl}>Подтвердить email</Button>
          </Section>

          <Text>
            Если вы не регистрировались в RentApp Shop, проигнорируйте это
            письмо.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
