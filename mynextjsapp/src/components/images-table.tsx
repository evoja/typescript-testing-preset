import {memo} from 'react'
import BtImage from 'react-bootstrap/Image'
import NextImage from 'next/image'
import person from 'bootstrap-icons/icons/person.svg'
import Person from 'bootstrap-icons/icons/person.svg?icon'
import person64 from 'bootstrap-icons/icons/person.svg?data'

import mc from 'mynextjsapp@/components/mc.png'

function ImagesTable() {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>{'<img>'}</th>
          <th>{'<bootstrap/Image>'}</th>
          <th>{'<next/image>'}</th>
          <th>{'@svgr'}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>svg</th>
          <td><img src={person}/></td>
          <td><BtImage src={person}/></td>
          <td><NextImage src={person} width={16} height={16}/></td>
          <td>-</td>
        </tr>
        <tr>
          <th>@svgr</th>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td><Person/></td>
        </tr>
        <tr>
          <th>svg inline</th>
          <td><img src={person64}/></td>
          <td><BtImage src={person64}/></td>
          <td><NextImage src={person64} width={16} height={16}/></td>
          <td>-</td>
        </tr>
        <tr>
          <th>png</th>
          <td><img src={mc.src}/></td>
          <td><BtImage src={mc.src}/></td>
          <td><NextImage src={mc}/></td>
          <td>-</td>
        </tr>
      </tbody>
    </table>
  )
}

const Pure = memo(ImagesTable)

export {
  Pure as ImagesTable
}
