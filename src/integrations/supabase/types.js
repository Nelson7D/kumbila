const Constants = {
  public: {
    Enums: {},
  },
};

const Database = {
  public: {
    Tables: {
      admin_logs: {
        Row: {
          action: '',
          admin_id: null,
          admin_name: '',
          created_at: '',
          details: null,
          entity_id: null,
          entity_type: '',
          id: '',
        },
        Insert: {
          action: '',
          admin_id: null,
          admin_name: '',
          created_at: '',
          details: null,
          entity_id: null,
          entity_type: '',
          id: '',
        },
        Update: {
          action: '',
          admin_id: null,
          admin_name: '',
          created_at: '',
          details: null,
          entity_id: null,
          entity_type: '',
          id: '',
        },
        Relationships: [],
      },
      checkins: {
        Row: {
          checkin_time: null,
          checkout_time: null,
          created_at: '',
          id: '',
          reservation_id: '',
          verified_by_owner: null,
        },
        Insert: {
          checkin_time: null,
          checkout_time: null,
          created_at: '',
          id: '',
          reservation_id: '',
          verified_by_owner: null,
        },
        Update: {
          checkin_time: null,
          checkout_time: null,
          created_at: '',
          id: '',
          reservation_id: '',
          verified_by_owner: null,
        },
        Relationships: [
          {
            foreignKeyName: 'checkins_reservation_id_fkey',
            columns: ['reservation_id'],
            isOneToOne: false,
            referencedRelation: 'reservations',
            referencedColumns: ['id'],
          },
        ],
      },
      payments: {
        Row: {
          amount: 0,
          created_at: null,
          id: '',
          method: null,
          paid_at: null,
          payment_proof: null,
          payment_reference: null,
          released_at: null,
          reservation_id: '',
          status: '',
        },
        Insert: {
          amount: 0,
          created_at: null,
          id: '',
          method: null,
          paid_at: null,
          payment_proof: null,
          payment_reference: null,
          released_at: null,
          reservation_id: '',
          status: '',
        },
        Update: {
          amount: 0,
          created_at: null,
          id: '',
          method: null,
          paid_at: null,
          payment_proof: null,
          payment_reference: null,
          released_at: null,
          reservation_id: '',
          status: '',
        },
        Relationships: [
          {
            foreignKeyName: 'payments_reservation_id_fkey',
            columns: ['reservation_id'],
            isOneToOne: false,
            referencedRelation: 'reservations',
            referencedColumns: ['id'],
          },
        ],
      },
      profiles: {
        Row: {
          avatar_url: null,
          created_at: '',
          full_name: null,
          id: '',
          status: null,
          updated_at: '',
        },
        Insert: {
          avatar_url: null,
          created_at: '',
          full_name: null,
          id: '',
          status: null,
          updated_at: '',
        },
        Update: {
          avatar_url: null,
          created_at: '',
          full_name: null,
          id: '',
          status: null,
          updated_at: '',
        },
        Relationships: [],
      },
      reservations: {
        Row: {
          created_at: '',
          end_datetime: '',
          extras: null,
          id: '',
          space_id: '',
          start_datetime: '',
          status: '',
          total_price: 0,
          updated_at: '',
          user_id: '',
        },
        Insert: {
          created_at: '',
          end_datetime: '',
          extras: null,
          id: '',
          space_id: '',
          start_datetime: '',
          status: '',
          total_price: 0,
          updated_at: '',
          user_id: '',
        },
        Update: {
          created_at: '',
          end_datetime: '',
          extras: null,
          id: '',
          space_id: '',
          start_datetime: '',
          status: '',
          total_price: 0,
          updated_at: '',
          user_id: '',
        },
        Relationships: [
          {
            foreignKeyName: 'reservations_space_id_fkey',
            columns: ['space_id'],
            isOneToOne: false,
            referencedRelation: 'spaces',
            referencedColumns: ['id'],
          },
        ],
      },
      reviews: {
        Row: {
          comment: null,
          created_at: '',
          id: '',
          rating: 0,
          space_id: '',
          user_id: '',
        },
        Insert: {
          comment: null,
          created_at: '',
          id: '',
          rating: 0,
          space_id: '',
          user_id: '',
        },
        Update: {
          comment: null,
          created_at: '',
          id: '',
          rating: 0,
          space_id: '',
          user_id: '',
        },
        Relationships: [
          {
            foreignKeyName: 'reviews_space_id_fkey',
            columns: ['space_id'],
            isOneToOne: false,
            referencedRelation: 'spaces',
            referencedColumns: ['id'],
          },
        ],
      },
      spaces: {
        Row: {
          capacity: 0,
          created_at: '',
          description: null,
          id: '',
          location: null,
          name: '',
          owner_id: '',
          price_per_day: 0,
          status: null,
          type: null,
          updated_at: '',
        },
        Insert: {
          capacity: 0,
          created_at: '',
          description: null,
          id: '',
          location: null,
          name: '',
          owner_id: '',
          price_per_day: 0,
          status: null,
          type: null,
          updated_at: '',
        },
        Update: {
          capacity: 0,
          created_at: '',
          description: null,
          id: '',
          location: null,
          name: '',
          owner_id: '',
          price_per_day: 0,
          status: null,
          type: null,
          updated_at: '',
        },
        Relationships: [],
      },
      user_roles: {
        Row: {
          created_at: '',
          id: '',
          role: '',
          user_id: '',
        },
        Insert: {
          created_at: '',
          id: '',
          role: '',
          user_id: '',
        },
        Update: {
          created_at: '',
          id: '',
          role: '',
          user_id: '',
        },
        Relationships: [],
      },
    },
    Views: {},
    Functions: {
      validate_and_perform_checkin: {
        Args: { reservation_id_param: '' },
        Returns: null,
      },
      validate_and_perform_checkout: {
        Args: { reservation_id_param: ''  },
        Returns: null,
      },
    },
    Enums: {},
    CompositeTypes: {},
  }
};

// Funções utilitárias para acessar tabelas, inserções, atualizações, enums e tipos compostos
const getTableRow = (schema, tableName) => {
  return Database[schema]?.Tables[tableName]?.Row || null;
};

const getTableInsert = (schema, tableName) => {
  return Database[schema]?.Tables[tableName]?.Insert || null;
};

const getTableUpdate = (schema, tableName) => {
  return Database[schema]?.Tables[tableName]?.Update || null;
};

const getEnum = (schema, enumName) => {
  return Database[schema]?.Enums[enumName] || null;
};

const getCompositeType = (schema, compositeTypeName) => {
  return Database[schema]?.CompositeTypes[compositeTypeName] || null;
};


export { Constants,
  Database,
  getTableRow,
  getTableInsert,
  getTableUpdate,
  getEnum,
  getCompositeType, };
