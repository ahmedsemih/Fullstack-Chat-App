import PageInfo from '../../components/layout/ContentArea/PageInfo';
import ChannelForm from './components/ChannelForm';

const Create = () => {
    return (
        <section>
            <PageInfo isChannel={false} name='Create Channel' />
            <ChannelForm />
        </section>
    )
}

export default Create;