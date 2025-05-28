import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, MoreHorizontal, Filter, RefreshCw, Ship, Download } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { formatDate, getStatusColor } from '../utils/formatters';
import { crews } from '../data/mockData';

const CrewManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter crews based on search term
  const filteredCrews = crews.filter(
    (crew) =>
      crew.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crew.rank.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crew.vessel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCrews = filteredCrews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCrews.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search crews..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <Plus size={16} className="mr-2" />
            Add Crew
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Rank</TableHead>
                <TableHead>Vessel</TableHead>
                <TableHead>Contract Status</TableHead>
                <TableHead>Contract Period</TableHead>
                <TableHead>Basic Pay</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCrews.map((crew) => (
                <TableRow key={crew.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {crew.photo ? (
                        <img
                          src={crew.photo}
                          alt={crew.name}
                          className="h-8 w-8 rounded-full mr-2 object-cover"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                          {crew.name.charAt(0)}
                        </div>
                      )}
                      {crew.name}
                    </div>
                  </TableCell>
                  <TableCell>{crew.rank}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Ship size={14} className="text-gray-500 mr-1" />
                      {crew.vessel}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        crew.contractStatus
                      )}`}
                    >
                      {crew.contractStatus}
                    </span>
                  </TableCell>
                  <TableCell>
                    {formatDate(crew.contractStart)} - {formatDate(crew.contractEnd)}
                  </TableCell>
                  <TableCell>
                    ${crew.basicPay.toLocaleString()} {crew.currency}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 size={16} />
                      </Button>
                      <div className="relative">
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal size={16} />
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {currentCrews.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center">
                      <Ship size={36} className="text-gray-300 mb-2" />
                      <p className="text-gray-500 text-lg">No crew members found</p>
                      <p className="text-gray-400 text-sm">
                        Try adjusting your search or add a new crew member
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between px-4 py-4 border-t">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, filteredCrews.length)} of {filteredCrews.length} crew members
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={i + 1 === currentPage ? 'default' : 'outline'}
                size="sm"
                onClick={() => handlePageChange(i + 1)}
                className="w-8"
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CrewManagementPage;