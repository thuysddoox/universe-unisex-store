import PageWapper from "@components/PageWrapper"
import withLayout from "@containers/layout/withLayout";
import Shop from "@containers/shop"

const ShopProductPage = () =>{
  return (
    <PageWapper className="py-32">
      <Shop />
    </PageWapper>
  )
}
ShopProductPage.getInitialProps = () => {
};
export default withLayout(ShopProductPage);