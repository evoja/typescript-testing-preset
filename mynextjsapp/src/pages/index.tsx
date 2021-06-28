import {MyBootstrapButton} from 'mynextjsapp@/components/my-bootstrap-button'
import {ImagesTable} from 'mynextjsapp@/components/images-table'
import {AddButtons} from 'mynextjsapp@/components/add-buttons'

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
        <AddButtons/>
      </div>
      <div>
      </div>
    </div>
  )
}
