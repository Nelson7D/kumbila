import React, { useState, useEffect } from 'react';
import { adminService } from '@/services/adminService';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { 
  MoreVertical, 
  Eye, 
  RotateCw, 
  Filter,
  Calendar,
  Ban,
  Home,
  User,
  History,
  FileClock
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Textarea } from "@/components/ui/textarea";

const ReservationsManagement = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalReservations, setTotalReservations] = useState(0);
  const [filters, setFilters] = useState({
    status: '',
    spaceId: '',
    userId: '',
    startDate: null,
    endDate: null,
  });
  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  });

  const reservationsPerPage = 10;

  const fetchReservations = async () => {
    setIsLoading(true);
    try {
      const { reservations, total } = await adminService.getReservations(filters, currentPage, reservationsPerPage);
      setReservations(reservations);
      setTotalReservations(total);
    } catch (error) {
      console.error('Error loading reservations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [currentPage, filters]);

  const handleDateRangeSelect = (range) => {
    setDateRange(range);
  };

  useEffect(() => {
    if (dateRange.from) {
      const updatedFilters = {};
      if (dateRange.from) {
        updatedFilters.startDate = format(dateRange.from, 'yyyy-MM-dd');
      }
      if (dateRange.to) {
        updatedFilters.endDate = format(dateRange.to, 'yyyy-MM-dd');
      }
      setFilters((prev) => ({
        ...prev,
        ...updatedFilters,
      }));
    }
  }, [dateRange]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      status: '',
      spaceId: '',
      userId: '',
      startDate: null,
      endDate: null,
    });
    setDateRange({
      from: undefined,
      to: undefined,
    });
    setCurrentPage(1);
  };

  const handleCancelReservation = async () => {
    if (selectedReservation && cancelReason) {
      try {
        await adminService.cancelReservation(selectedReservation.id, cancelReason);
        setShowCancelDialog(false);
        setCancelReason('');
        fetchReservations();
      } catch (error) {
        console.error('Error canceling reservation:', error);
      }
    }
  };

  const openCancelDialog = (reservation) => {
    setSelectedReservation(reservation);
    setShowCancelDialog(true);
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'pendente':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Pendente
          </Badge>
        );
      case 'confirmada':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Confirmada
          </Badge>
        );
      case 'em_andamento':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Em andamento
          </Badge>
        );
      case 'finalizada':
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Finalizada
          </Badge>
        );
      case 'cancelada':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Cancelada
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Gestão de Reservas</h1>
          <p className="text-muted-foreground mt-1">Visualize e gerencie todas as reservas da plataforma</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select 
            value={filters.status} 
            onValueChange={(value) => handleFilterChange('status', value)}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="confirmada">Confirmada</SelectItem>
              <SelectItem value="em_andamento">Em andamento</SelectItem>
              <SelectItem value="finalizada">Finalizada</SelectItem>
              <SelectItem value="cancelada">Cancelada</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`w-[240px] justify-start text-left font-normal ${
                  dateRange.from ? "" : "text-muted-foreground"
                }`}
              >
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "dd/MM/yyyy")} -{" "}
                      {format(dateRange.to, "dd/MM/yyyy")}
                    </>
                  ) : (
                    format(dateRange.from, "dd/MM/yyyy")
                  )
                ) : (
                  <span>Selecionar período</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="range"
                selected={dateRange}
                onSelect={handleDateRangeSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="flex items-center ml-auto gap-2">
          <Button variant="outline" onClick={resetFilters}>
            Limpar filtros
          </Button>
          <Button variant="default" onClick={fetchReservations}>
            <RotateCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Espaço</TableHead>
                  <TableHead>Entrada</TableHead>
                  <TableHead>Saída</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservations.length > 0 ? (
                  reservations.map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell className="font-medium">{reservation.user.full_name}</TableCell>
                      <TableCell>{reservation.space.name}</TableCell>
                      <TableCell>{format(new Date(reservation.start_datetime), 'dd/MM/yyyy HH:mm')}</TableCell>
                      <TableCell>{format(new Date(reservation.end_datetime), 'dd/MM/yyyy HH:mm')}</TableCell>
                      <TableCell>
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(reservation.total_price)}
                      </TableCell>
                      <TableCell>{renderStatusBadge(reservation.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Abrir menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => window.open(`/reserva/${reservation.id}`, '_blank')}>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => window.open(`/espaco/${reservation.space.id}`, '_blank')}>
                              <Home className="mr-2 h-4 w-4" />
                              Ver espaço
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => window.open(`/perfil/${reservation.user.id}`, '_blank')}>
                              <User className="mr-2 h-4 w-4" />
                              Ver usuário
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {reservation.status !== 'cancelada' && reservation.status !== 'finalizada' && (
                              <DropdownMenuItem onClick={() => openCancelDialog(reservation)}>
                                <Ban className="mr-2 h-4 w-4 text-red-600" />
                                Cancelar reserva
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      Nenhuma reserva encontrada
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Mostrando {reservations.length} de {totalReservations} reservas
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={reservations.length < reservationsPerPage}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Próxima
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Cancel Reservation Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar reserva</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação cancelará a reserva e notificará o usuário. Esta ação não pode ser desfeita.
              <br /><br />
              Espaço: {selectedReservation?.space.name}
              <br />
              Usuário: {selectedReservation?.user.full_name}
              <br />
              Período: {selectedReservation && format(new Date(selectedReservation.start_datetime), 'dd/MM/yyyy HH:mm')} 
              {' - '} 
              {selectedReservation && format(new Date(selectedReservation.end_datetime), 'dd/MM/yyyy HH:mm')}
              <br /><br />
              Por favor, forneça um motivo para o cancelamento:
              <Textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Motivo do cancelamento..."
                className="mt-2"
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCancelReason('')}>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleCancelReservation} 
              disabled={!cancelReason}
              className="bg-red-600 hover:bg-red-700"
            >
              Cancelar Reserva
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ReservationsManagement;
