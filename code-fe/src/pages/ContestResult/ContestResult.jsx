import Footer from '~/components/Footer';
import MainNavbar from '~/components/Navbars/MainNavbar';

const { Box, VStack, Card, CardBody, Button, ButtonGroup } = require('@chakra-ui/react');

const ContestResult = () => {
  return (
    <Box bg="var(--primary-bg-color)">
      <MainNavbar />

      <VStack gap={10} my={20}>
        <Card variant="elevated" borderRadius="3xl" boxShadow="xl" p="30px" w="fit-content" h="fit-content">
          <CardBody>sldkfj</CardBody>
        </Card>

        <Card variant="elevated" borderRadius="3xl" boxShadow="xl" p="20px" w="fit-content" h="fit-content">
          <CardBody></CardBody>
        </Card>

        <Card variant="elevated" borderRadius="3xl" boxShadow="xl" p="20px" w="80%" h="fit-content">
          <CardBody>
            <ButtonGroup gap={6} justifyContent="flex-end">
              <Button height="50px" borderRadius="2xl" size="lg" colorScheme="teal" variant="solid">
                Start now
              </Button>
            </ButtonGroup>
          </CardBody>
        </Card>
      </VStack>

      <Footer />
    </Box>
  );
};

export default ContestResult;
