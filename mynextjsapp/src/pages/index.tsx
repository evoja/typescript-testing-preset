import {MyBootstrapButton} from 'mynextjsapp@/components/my-bootstrap-button'
import {ImagesTable} from 'mynextjsapp@/components/images-table'
import {SumButtons} from 'mynextjsapp@/components/sum-buttons'

export default function Index() {
  return (
    <div>
      <div>
        <MyBootstrapButton>Hello</MyBootstrapButton>
      </div>
      <div>
        <ImagesTable/>
      </div>
      <div>
        <SumButtons/>
      </div>
      <div>
      </div>
    </div>
  )
}
