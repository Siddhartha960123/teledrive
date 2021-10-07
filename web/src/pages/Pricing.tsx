import { ArrowRightOutlined } from '@ant-design/icons'
import { Button, Card, Col, Layout, Row, Typography } from 'antd'
import React from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import useSWRImmutable from 'swr/immutable'
import { fetcher } from '../utils/Fetcher'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

const Pricing: React.FC = () => {
  const history = useHistory()
  const { data: me } = useSWRImmutable('/users/me', fetcher)

  const select = (plan: 'free' | 'premium' | 'professional' | 'donation') => {
    if (plan === 'free' || me?.user.plan === plan) {
      return history.push('/login')
    }

    return window.open('https://www.buymeacoffee.com/mgilangjanuar', '_blank')
  }

  const Free = () => <Card color="warning" hoverable title="FREE" style={{ fontSize: '1rem' }} actions={[<Button block type="text" size="large">Select <ArrowRightOutlined /></Button>]} onClick={() => select('free')}>
    <Typography.Title style={{ textAlign: 'center', fontSize: '5em', fontWeight: 300 }}>
      <Typography.Text style={{ fontSize: '0.35em' }}>$ </Typography.Text>
      0
    </Typography.Title>
    <ul style={{ textAlign: 'center', listStyleType: 'none' }}>
      <li><strong>Unlimited</strong> files size</li>
      <li><strong>Unlimited</strong> total files</li>
      <li><strong>All basic features</strong></li>
    </ul>
  </Card>

  const Donation = () => <div style={{ textAlign: 'center' }}>
    <Typography.Title level={2}>
      Support us to keep this service running 🚀
    </Typography.Title>
    <br />
    <Typography.Paragraph>
      <a href="https://www.buymeacoffee.com/mgilangjanuar" target="_blank">
        <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style={{ width: '100%', maxWidth: '170px' }} />
      </a>
    </Typography.Paragraph>
    <Typography.Paragraph>
      or, via <a href="https://paypal.me/mgilangjanuar" target="_blank">PayPal</a>.
    </Typography.Paragraph>
    <br />
    <Typography.Paragraph type="secondary">
      Feel free to <Link to="/contact?intent=sponsor">contact us</Link> if you have any questions or become a sponsor &mdash; or if you would like to help us in other ways.
    </Typography.Paragraph>
  </div>

  return <>
    <Navbar user={me} page="pricing" />
    <Layout.Content className="container" style={{ marginTop: '80px' }}>
      <Row>
        <Col md={{ span: 20, offset: 2 }} span={24}>
          <Row gutter={48} align="middle">
            <Col lg={{ span: 8, offset: 4 }} span={24} style={{ marginBottom: '72px' }}>
              <Donation />
            </Col>
            <Col lg={{ span: 8 }} span={24} style={{ marginBottom: '72px' }}>
              <Free />
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout.Content>
    <Footer />
  </>
}

export default Pricing