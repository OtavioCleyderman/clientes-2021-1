import { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import InputMask from 'react-input-mask'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import ConfirmDialog from '../ui/ConfirmDialog'
import React from 'react'

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    maxWidth: '80%',
    margin: '0 auto',
    '& .MuiFormControl-root': {
      minWidth: '200px',
      maxWidth: '500px',
      margin: '0 24px 24px 0'
    }
  },
  toolbar: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: '36px'
  },
  importado: {
    '& .MuiFormControlLabel-root': {
      display: 'block'
    }
  }

}))

export default function ClientesForm() {
  const classes = useStyles()

  const estados = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
  ]


  // Classes de caracters para a máscara da placa
  // somente dígitos ~> [0-9]
  const formatChars = {
    '0': '[0-9]',
  }

  // Máscara para CPF
  const cpfMask = '000.000.000-00'
  // Máscara para RG
  const rgMask = '00.000.000'
  // Máscara para o telefone
  const telMask = '(00)0000-0000'





  const [cliente, setCliente] = useState({
    id: null,
    nome: '',
    cpf: '',
    rg: '',
    logradouro: '',
    num_imovel: '',
    complemento: '',
    bairro: '',
    municipio: '',
    uf: '',
    telefone: '',
    email: '',
  })



  const [sendBtnStatus, setSendBtnStatus] = useState({
    disabled: false,
    label: 'Enviar'
  })

  const [sbStatus, setSbStatus] = useState({
    open: false,
    severity: 'success',
    message: ''
  })

  const [error, setError] = useState({
    nome: '',
    cpf: '',
    rg: '',
    logradouro: '',
    num_imovel: '',
    complemento: '',
    bairro: '',
    municipio: '',
    uf: '',
    telefone: '',
    email: '',
  })

  const [isModified, setIsModified] = useState(false)

  const [title, setTitle] = useState('Cadastrar novo cliente')

  const history = useHistory()
  const params = useParams()

  // useEffect() para quando o formulário for carregado (só na inicialização)
  useEffect(() => {
    // Verificamos se a rota atual contém o parâmetro id
    // Em caso positivo, buscamos os dados no back-end e carregamos o formulário para edição
    if (params.id) {
      setTitle('Editar cliente')
      getData(params.id)
    }
  }, [])

  async function getData(id) {
    try {
      let response = await axios.get(`https://api.faustocintra.com.br/clientes/${id}`)
      setCliente(response.data)
    }
    catch (error) {
      setSbStatus({
        open: true,
        severity: 'error',
        message: "Não foi possível carregar os dados para edição."
      })
    }
  }

  const [dialogOpen, setDialogOpen] = useState(false) // O diálogo de confirmação está aberto?


  function handleInputChange(event, property) {

    const clienteTemp = { ...cliente }


    if (event.target.id) property = event.target.id
    if (property === 'municipio') {
      clienteTemp.municipio = event.target.value.toUpperCase()
    }
    else {
      // Quando o nome de uma propriedade de objeto aparece entre [],
      // significa que o nome da propriedade será determinado pela
      // variável ou expressão contida dentro dos colchetes
      clienteTemp[property] = event.target.value
    }

    setCliente(clienteTemp)
    setIsModified(true)   // O formulário foi modificado
    validate(clienteTemp)  // Dispara a validação
  }

  function validate(data) {
    let isValid = true

    const errorTemp = {
      nome: '',
      cpf: '',
      rg: '',
      logradouro: '',
      num_imovel: '',
      complemento: '',
      bairro: '',
      municipio: '',
      uf: '',
      telefone: '',
      email: '',
    }

    // trim(): retira espaços em branco do início e do final de uma string
    if (data.nome.trim() === '') {
      errorTemp.nome = 'O nome deve ser preenchido'
      isValid = false
    }

    if (data.logradouro.trim() === '') {
      errorTemp.logradouro = 'O logradouro deve ser preenchido'
      isValid = false
    }

    if (data.num_imovel.trim() === '') {
      errorTemp.num_imovel = 'O número do imóvel deve ser preenchido'
      isValid = false
    }

    if (data.bairro.trim() === '') {
      errorTemp.bairro = 'O bairro deve ser preenchido'
      isValid = false
    }

    if (data.municipio.trim() === '') {
      errorTemp.municipio = 'O município deve ser preenchido'
      isValid = false
    }

    if (data.uf.trim() === '') {
      errorTemp.uf = 'A UF deve ser informada'
      isValid = false
    }

    // O CPF não pode ser string vazia nem conter sublinhado
    if (data.cpf.trim() === '' || data.cpf.includes('_')) {
      errorTemp.cpf = 'O CPF deve ser preenchido corretamente'
      isValid = false
    }

    // O RG não pode ser string vazia nem conter sublinhado
    if (data.rg.trim() === '' || data.rg.includes('_')) {
      errorTemp.rg = 'O RG deve ser preenchido corretamente'
      isValid = false
    }

    // O telefone não pode ser string vazia nem conter sublinhado
    if (data.telefone.trim() === '' || data.telefone.includes('_')) {
      errorTemp.telefone = 'O telefone deve ser preenchido corretamente'
      isValid = false
    }

    if (data.email.trim() === '') {
      errorTemp.email = 'O e-mail deve ser preenchido'
      isValid = false
    }

    setError(errorTemp)
    return isValid
  }

  async function saveData() {
    try {
      // Desabilita o botão de enviar para evitar envios duplicados
      setSendBtnStatus({ disabled: true, label: 'Enviando...' })

      // Se estivermos editando, precisamos enviar os dados com o verbo HTTP PUT
      if (params.id) await axios.put(`https://api.faustocintra.com.br/clientes/${params.id}`, cliente)
      // Senão, estaremos criando um novo registro, e o verbo HTTP a ser usado será o POST
      else await axios.post('https://api.faustocintra.com.br/clientes', cliente)

      // Mostra a SnackBar 
      setSbStatus({ open: true, severity: 'success', message: 'Dados salvos com sucesso!' })

    }
    catch (error) {
      // Mostra a SnackBar
      setSbStatus({ open: true, severity: 'error', message: 'ERRO: ' + error.message })
    }
    // Restaura o estado inicial do botão de envio
    setSendBtnStatus({ disabled: false, label: 'Enviar' })
  }

  function handleSubmit(event) {

    event.preventDefault()    // Evita que a página seja recarregada

    // Só envia para o banco de dados se o formulário for válido
    if (validate(cliente)) saveData()

  }

  function handleSbClose() {
    setSbStatus({ ...sbStatus, open: false })

    // Retorna para a página de listagem em caso de sucesso
    if (sbStatus.severity === 'success') history.push('/list')
  }

  function handleDialogClose(result) {
    setDialogOpen(false)

    // Se o usuário realmente deseja voltar
    if (result) history.push('/list')
  }

  function handleGoBack() {
    // se o formulário tiver sido modificado, exibimos o diálogo de confirmação
    if (isModified) setDialogOpen(true)
    // Senão, podemos voltar diretamente para a listagem
    else history.push('/list')
  }

  return (
    <>
      <ConfirmDialog isOpen={dialogOpen} onClose={handleDialogClose}>
        Há dados não salvos. Deseja realmente voltar?
      </ConfirmDialog>

      <Snackbar open={sbStatus.open} autoHideDuration={6000} onClose={handleSbClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSbClose} severity={sbStatus.severity}>
          {sbStatus.message}
        </MuiAlert>
      </Snackbar>

      <h1>{title}</h1>
      <form className={classes.form} onSubmit={handleSubmit}>

        <TextField
          id="nome"
          label="Nome"
          variant="filled"
          value={cliente.nome}
          onChange={handleInputChange}
          required  /* not null, precisa ser preenchido */
          placeholder="Informe o nome do cliente"
          fullWidth
          error={error.nome !== ''}
          helperText={error.nome}
        />

        <InputMask
          id="cpf"
          mask={cpfMask}
          formatChars={formatChars}
          value={cliente.cpf}
          onChange={(event) => handleInputChange(event, 'cpf')}
        >
          {() => <TextField
            label="CPF"
            variant="filled"
            required  /* not null, precisa ser preenchido */
            placeholder="Informe o CPF do cliente"
            fullWidth
            error={error.cpf !== ''}
            helperText={error.cpf}
          />}
        </InputMask>

        <InputMask
          id="rg"
          mask={rgMask}
          formatChars={formatChars}
          value={cliente.rg}
          onChange={(event) => handleInputChange(event, 'rg')}
        >
          {() => <TextField
            label="RG"
            variant="filled"
            required  /* not null, precisa ser preenchido */
            placeholder="Informe o RG do cliente"
            fullWidth
            error={error.rg !== ''}
            helperText={error.rg}
          />}
        </InputMask>

        <TextField
          id="logradouro"
          label="Logradouro"
          variant="filled"
          value={cliente.logradouro}
          onChange={handleInputChange}
          required  /* not null, precisa ser preenchido */
          placeholder="Informe o logradouro do cliente"
          fullWidth
          error={error.logradouro !== ''}
          helperText={error.logradouro}
        />

        <TextField
          id="num_imovel"
          label="Número do imóvel"
          variant="filled"
          value={cliente.num_imovel}
          onChange={handleInputChange}
          required  /* not null, precisa ser preenchido */
          placeholder="Informe o número do imóvel"
          fullWidth
          error={error.num_imovel !== ''}
          helperText={error.num_imovel}
        />

        <TextField
          id="complemento"
          label="Complemento"
          variant="filled"
          value={cliente.complemento}
          onChange={handleInputChange}
          placeholder="Informe o Complemento, se houver"
          fullWidth
          error={error.complemento !== ''}
          helperText={error.complemento}
        />

        <TextField
          id="bairro"
          label="Bairro"
          variant="filled"
          value={cliente.bairro}
          onChange={handleInputChange}
          required  /* not null, precisa ser preenchido */
          placeholder="Informe o bairro"
          fullWidth
          error={error.bairro !== ''}
          helperText={error.bairro}
        />

        <TextField
          id="municipio"
          label="Município"
          variant="filled"
          value={cliente.municipio}
          onChange={handleInputChange}
          required  /* not null, precisa ser preenchido */
          placeholder="Informe o município"
          fullWidth
          error={error.municipio !== ''}
          helperText={error.municipio}
        />

        <TextField
          id="uf"
          label="UF"
          variant="filled"
          value={cliente.uf}
          onChange={event => handleInputChange(event, 'uf')}
          required  /* not null, precisa ser preenchido */
          placeholder="Informe a UF do município"
          select
          fullWidth
          error={error.uf !== ''}
          helperText={error.uf}
        >
          {estados.map(estado => <MenuItem value={estado} key={estado}>{estado}</MenuItem>)}
        </TextField>


        <InputMask
          id="telefone"
          mask={telMask}
          formatChars={formatChars}
          value={cliente.telefone}
          onChange={(event) => handleInputChange(event, 'telefone')}
        >
          {() => <TextField
            label="telefone"
            variant="filled"
            required  /* not null, precisa ser preenchido */
            placeholder="Informe o telefone do cliente"
            fullWidth
            error={error.telefone !== ''}
            helperText={error.telefone}
          />}
        </InputMask>

        <TextField
          id="email"
          label="E-mail"
          variant="filled"
          value={cliente.email}
          onChange={handleInputChange}
          required  /* not null, precisa ser preenchido */
          placeholder="Informe o e-mail do cliente"
          fullWidth
          error={error.email !== ''}
          helperText={error.email}
        />

        <Toolbar className={classes.toolbar}>
          <Button type="submit" variant="contained" color="secondary" disabled={sendBtnStatus.disabled}>
            {sendBtnStatus.label}
          </Button>
          <Button variant="contained" onClick={handleGoBack}>Voltar</Button>
        </Toolbar>

        {/*    
        <div>
          {JSON.stringify(cliente)}
          <br />
          currentId: {JSON.stringify(currentId)}
          <br />
          isModified: {JSON.stringify(isModified)}
        </div>
      */}
      </form>
    </>
  )
}