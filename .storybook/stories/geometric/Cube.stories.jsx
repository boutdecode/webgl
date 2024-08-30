import {Setup} from '@story/Setup.jsx'

export default {
  title: 'Geometric/Cube',
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'color',
      description: 'Cube color',
    }
  },
  args: {
    color: 'orange'
  },
  decorators: [
    (Story) => (
      <Setup>
        <Story />
      </Setup>
    ),
  ],
}

export const Basic = {
  render ({color}) {
    return <mesh>
      <boxGeometry/>
      <meshBasicMaterial color={color}/>
    </mesh>
  }
}

export const Standard = {
  render ({color}) {
    return <mesh>
      <boxGeometry/>
      <meshStandardMaterial color={color}/>
    </mesh>
  }
}
